import { db } from '@/constants/firebaseConfig';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Path, Svg } from 'react-native-svg';

interface Driver {
  id: string;
  driver: string;
  teams: string;
  pictures: string;
  win_probability: number;
}

const PredictScreen = () => {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        // Create a query to fetch drivers ordered by win_probability in descending order
        const driversCollection = collection(db, 'drivers');
        const q = query(driversCollection, orderBy("win_probability", "desc"));
        
        const querySnapshot = await getDocs(q);
        const driversData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as Driver[];
        
        setDrivers(driversData);
      } catch (error)
      {
        console.error("Error fetching drivers: ", error);
        // This can happen if you haven't created a composite index in Firestore yet.
        // Check the console error for a link to create one automatically.
      } 
      finally {
        setLoading(false);
      }
    };

    fetchDrivers();
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#ffffff" style={styles.loader} />
      ) : (
        <ScrollView>
          <View style={styles.countdownContainer}>
            <View style={styles.countdownItem}>
              <View style={styles.countdownValueContainer}>
                <Text style={styles.countdownValue}>2</Text>
              </View>
              <Text style={styles.countdownLabel}>Days</Text>
            </View>
            <View style={styles.countdownItem}>
              <View style={styles.countdownValueContainer}>
                <Text style={styles.countdownValue}>14</Text>
              </View>
              <Text style={styles.countdownLabel}>Hours</Text>
            </View>
            <View style={styles.countdownItem}>
              <View style={styles.countdownValueContainer}>
                <Text style={styles.countdownValue}>30</Text>
              </View>
              <Text style={styles.countdownLabel}>Minutes</Text>
            </View>
            <View style={styles.countdownItem}>
              <View style={styles.countdownValueContainer}>
                <Text style={styles.countdownValue}>15</Text>
              </View>
              <Text style={styles.countdownLabel}>Seconds</Text>
            </View>
          </View>

          <Text style={styles.driversHeader}>Predicted Finishing Positions</Text>

          {drivers.map((driver, index) => (
            <View key={driver.id} style={styles.driverContainer}>
              <View style={styles.driverInfo}>
                <Image
                  source={{ uri: driver.pictures }}
                  style={styles.driverImage}
                />
                <View>
                  <Text style={styles.driverName}>{driver.driver}</Text>
                  <Text style={styles.driverTeam}>{driver.teams}</Text>
                </View>
              </View>
              <Text style={styles.driverPosition}>{index + 1}{index === 0 ? 'st' : index === 1 ? 'nd' : index === 2 ? 'rd' : 'th'}</Text>
            </View>
          ))}

          <View style={styles.reasoningContainer}>
            <View style={styles.reasoningHeader}>
              <Text style={styles.reasoningHeaderText}>Reasoning</Text>
              <Svg width="20" height="20" viewBox="0 0 256 256" fill="white">
                <Path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z" />
              </Svg>
            </View>
            <Text style={styles.reasoningText}>
              My predictions are based on engine performance, weather conditions, driver form, and qualifying positions.
            </Text>
          </View>
        </ScrollView>
      )}
    </View>
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
  countdownContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
  },
  countdownItem: {
    alignItems: 'center',
  },
  countdownValueContainer: {
    backgroundColor: '#482323',
    padding: 16,
    borderRadius: 8,
  },
  countdownValue: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  countdownLabel: {
    color: 'white',
    fontSize: 14,
    marginTop: 8,
  },
  driversHeader: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    paddingHorizontal: 16,
    paddingBottom: 12,
    paddingTop: 20,
  },
  driverContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    minHeight: 72,
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
  },
  reasoningContainer: {
    margin: 16,
    backgroundColor: '#482323',
    borderRadius: 12,
    padding: 16,
  },
  reasoningHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 8,
  },
  reasoningHeaderText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  reasoningText: {
    color: '#c99292',
    fontSize: 14,
  },
});

export default PredictScreen;
