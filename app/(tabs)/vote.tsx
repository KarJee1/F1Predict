import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import { collection, getDocs, query, orderBy, doc, setDoc } from 'firebase/firestore';
import { db, auth } from '@/constants/firebaseConfig';
import DraggableFlatList, { RenderItemParams, ScaleDecorator } from 'react-native-draggable-flatlist';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { router } from 'expo-router';

interface Driver {
  id: string;
  driver: string;
  teams: string;
  pictures: string;
  win_probability: number;
}

const VoteScreen = () => {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const driversCollection = collection(db, 'drivers');
        const q = query(driversCollection, orderBy("win_probability", "desc"));
        const querySnapshot = await getDocs(q);
        const driversData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as Driver[];
        setDrivers(driversData);
      } catch (error) {
        console.error("Error fetching drivers: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDrivers();
  }, []);

  const savePrediction = async () => {
    const user = auth.currentUser;
    if (!user) {
      Alert.alert("Authentication Required", "You must be logged in to save a prediction.");
      return;
    }
    try {
      const predictionData = drivers.map((driver, index) => ({
        driverId: driver.id,
        predictedPosition: index + 1,
      }));
      await setDoc(doc(db, "predictions", user.uid), {
        userId: user.uid,
        prediction: predictionData,
        createdAt: new Date(),
      });
      Alert.alert("Success", "Your prediction has been saved!");
    } catch (error) {
      Alert.alert("Error", "Could not save your prediction. Please try again.");
      console.error("Error saving prediction: ", error);
    }
  };

  const renderItem = ({ item, drag, isActive }: RenderItemParams<Driver>) => {
    return (
      <ScaleDecorator>
        <TouchableOpacity
          onLongPress={drag}
          disabled={isActive}
          style={[styles.driverContainer, isActive && styles.shadow]}
        >
          <View style={styles.driverInfo}>
            <Image source={{ uri: item.pictures }} style={styles.driverImage} />
            <View>
              <Text style={styles.driverName}>{item.driver}</Text>
              <Text style={styles.driverTeam}>{item.teams}</Text>
            </View>
          </View>
          <Text style={styles.driverPosition}>{drivers.indexOf(item) + 1}</Text>
        </TouchableOpacity>
      </ScaleDecorator>
    );
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#ffffff" style={styles.loader} />;
  }

  return (
    <GestureHandlerRootView style={styles.container}>
      <DraggableFlatList
        data={drivers}
        onDragEnd={({ data }) => setDrivers(data)}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListHeaderComponent={() => (
          <View>
            <Text style={styles.driversHeader}>Predict Finishing Positions</Text>
            <TouchableOpacity onPress={() => router.push('/statistics')}>
              <Text style={styles.linkText}>View Statistics</Text>
            </TouchableOpacity>
          </View>
        )}
        ListFooterComponent={() => (
          <TouchableOpacity style={styles.saveButton} onPress={savePrediction}>
            <Text style={styles.saveButtonText}>Save My Prediction</Text>
          </TouchableOpacity>
        )}
      />
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#221111',
      },
      loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      driversHeader: {
        color: 'white',
        fontSize: 22,
        fontWeight: 'bold',
        paddingHorizontal: 16,
        paddingBottom: 12,
        paddingTop: 20,
      },
      linkText: {
        color: '#c99292',
        textAlign: 'center',
        paddingBottom: 20,
        fontSize: 16,
      },
      driverContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        minHeight: 72,
        backgroundColor: '#221111',
      },
      shadow: {
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      },
      driverInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
      },
      driverImage: {
        width: 56,
        height: 56,
        borderRadius: 28,
      },
      driverName: {
        color: 'white',
        fontSize: 16,
        fontWeight: '500',
      },
      driverTeam: {
        color: '#c99292',
        fontSize: 14,
      },
      driverPosition: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
      },
      saveButton: {
        backgroundColor: '#890f0f',
        borderRadius: 9999,
        height: 48,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 16,
      },
      saveButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
      },
});

export default VoteScreen;
