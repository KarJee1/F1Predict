import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, ActivityIndicator } from 'react-native';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '@/constants/firebaseConfig';

interface Driver {
  id: string;
  driver: string;
  points: number;
  pictures: string;
}

const LeaderboardScreen = () => {
  const [leaderboard, setLeaderboard] = useState<Driver[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const driversCollection = collection(db, 'drivers');
        const q = query(driversCollection, orderBy("points", "desc"));
        const querySnapshot = await getDocs(q);
        const leaderboardData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as Driver[];
        setLeaderboard(leaderboardData);
      } catch (error) {
        console.error("Error fetching leaderboard: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchLeaderboard();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#ffffff" style={styles.loader} />;
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        {leaderboard.map((driver, index) => (
          <View key={driver.id} style={styles.driverContainer}>
            <View style={styles.driverInfo}>
              <Image source={{ uri: driver.pictures }} style={styles.driverImage} />
              <View>
                <Text style={styles.driverName}>{driver.driver}</Text>
                <Text style={styles.driverPosition}>{`${index + 1}${index === 0 ? 'st' : index === 1 ? 'nd' : index === 2 ? 'rd' : 'th'}`}</Text>
              </View>
            </View>
            <Text style={styles.driverPoints}>{driver.points}</Text>
          </View>
        ))}
      </ScrollView>
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
  driverContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    minHeight: 72,
    paddingVertical: 8,
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
  driverPosition: {
    color: '#c89393',
    fontSize: 14,
  },
  driverPoints: {
    color: 'white',
    fontSize: 16,
  },
});

export default LeaderboardScreen;
