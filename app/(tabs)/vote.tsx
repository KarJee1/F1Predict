import { auth, db } from '@/constants/firebaseConfig';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { onAuthStateChanged, User } from 'firebase/auth';
import { collection, doc, getDoc, getDocs, orderBy, query, setDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import DraggableFlatList, { RenderItemParams, ScaleDecorator } from 'react-native-draggable-flatlist';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

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
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchDriverData = async () => {
      setLoading(true);
      try {
        // First, fetch all driver data
        const driversCollection = collection(db, 'Drivers');
        const driversSnapshot = await getDocs(driversCollection);
        const driversData = driversSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as Driver[];
        const driversMap = new Map(driversData.map(d => [d.id, d]));

        if (user) {
          // If user is logged in, try to fetch their prediction
          const predictionDocRef = doc(db, 'user_prediction', user.uid);
          const predictionDoc = await getDoc(predictionDocRef);

          if (predictionDoc.exists()) {
            // If prediction exists, sort drivers based on saved order
            const prediction = predictionDoc.data().prediction as { driverId: string; predictedPosition: number }[];
            const sortedDrivers = prediction
              .sort((a, b) => a.predictedPosition - b.predictedPosition)
              .map(p => driversMap.get(p.driverId))
              .filter((d): d is Driver => d !== undefined);
            setDrivers(sortedDrivers);
          } else {
            // If no prediction, sort by win probability
            const sortedByWinProb = [...driversData].sort((a, b) => b.win_probability - a.win_probability);
            setDrivers(sortedByWinProb);
          }
        } else {
          // If not logged in, sort by win probability
          const sortedByWinProb = [...driversData].sort((a, b) => b.win_probability - a.win_probability);
          setDrivers(sortedByWinProb);
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
        // Fallback to default sorting in case of error
        const driversCollection = collection(db, 'drivers');
        const q = query(driversCollection, orderBy("win_probability", "desc"));
        const querySnapshot = await getDocs(q);
        const driversData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Driver[];
        setDrivers(driversData);
      } finally {
        setLoading(false);
      }
    };

    fetchDriverData();
  }, [user]);

  const savePrediction = async () => {
    if (!user) {
      Alert.alert("Authentication Required", "You must be logged in to save a prediction.");
      return;
    }
    try {
      const predictionData = drivers.map((driver, index) => ({
        driverId: driver.id,
        predictedPosition: index + 1,
      }));
      await setDoc(doc(db, "user_prediction", user.uid), {
        userId: user.uid,
        userEmail: user.email,
        userDisplayName: user.displayName,
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
            <LinearGradient
              colors={['#890f0f', '#221111']}
              style={styles.gradient}
            >
              <Text style={styles.driversHeader}>Predict Finishing Positions</Text>
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={savePrediction}>
                  <Text style={styles.buttonText}>Save My Prediction</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => router.push('/statistics')}>
                  <Text style={styles.buttonText}>View Statistics</Text>
                </TouchableOpacity>
              </View>
            </LinearGradient>
          </View>
        )}
        ListFooterComponent={<View style={{ height: 100 }} />}
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
        textAlign: 'center',
      },
      gradient: {
        paddingBottom: 20,
      },
      buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingHorizontal: 16,
      },
      button: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: 9999,
        height: 48,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        marginHorizontal: 8,
      },
      buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
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
});

export default VoteScreen;
