import { db } from '@/constants/firebaseConfig';
import { collection, getDocs, limit, orderBy, query, where } from 'firebase/firestore';
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

interface Race {
  id: string;
  race_name: string;
  sessions: {
    race_start_utc: string;
  };
}

const PredictScreen = () => {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [loading, setLoading] = useState(true);
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [nextRace, setNextRace] = useState<Race | null>(null);

  useEffect(() => {
    const fetchNextRace = async () => {
      try {
        const racesCollection = collection(db, 'races');
        const now = new Date();
        const nowISO = now.toISOString();
        const q = query(
          racesCollection,
          where('sessions.race_start_utc', '>', nowISO),
          orderBy('sessions.race_start_utc'),
          limit(1)
        );
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const doc = querySnapshot.docs[0];
          const raceData = doc.data() as Omit<Race, 'id'>;
          setNextRace({ id: doc.id, ...raceData });
        }
      } catch (error) {
        console.error("Error fetching next race: ", error);
      }
    };
    fetchNextRace();
  }, []);

  useEffect(() => {
    if (!nextRace) return;

    const calculateCountdown = () => {
      const raceDate = new Date(nextRace.sessions.race_start_utc);
      const now = new Date();
      const difference = raceDate.getTime() - now.getTime();

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);
        setCountdown({ days, hours, minutes, seconds });
      } else {
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    const timer = setInterval(calculateCountdown, 1000);
    return () => clearInterval(timer);
  }, [nextRace]);

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

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#ffffff" style={styles.loader} />
      ) : (
        <ScrollView>
          <View style={styles.countdownContainer}>
            <View style={styles.countdownItem}>
              <View style={styles.countdownValueContainer}>
                <Text style={styles.countdownValue}>{countdown.days}</Text>
              </View>
              <Text style={styles.countdownLabel}>Days</Text>
            </View>
            <View style={styles.countdownItem}>
              <View style={styles.countdownValueContainer}>
                <Text style={styles.countdownValue}>{countdown.hours}</Text>
              </View>
              <Text style={styles.countdownLabel}>Hours</Text>
            </View>
            <View style={styles.countdownItem}>
              <View style={styles.countdownValueContainer}>
                <Text style={styles.countdownValue}>{countdown.minutes}</Text>
              </View>
              <Text style={styles.countdownLabel}>Minutes</Text>
            </View>
            <View style={styles.countdownItem}>
              <View style={styles.countdownValueContainer}>
                <Text style={styles.countdownValue}>{countdown.seconds}</Text>
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
