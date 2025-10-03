import { db } from '@/constants/firebaseConfig';
import { collection, getDocs, orderBy, query, limit, where, Timestamp } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { Path, Svg } from 'react-native-svg';
import { useNavigation } from 'expo-router';

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
    race_start_utc: Timestamp;
  };
}

const getRankChipStyle = (index: number): ViewStyle => {
  let backgroundColor;
  if (index < 5) { // Top 5
    backgroundColor = '#3E8E41'; // Green
  } else if (index < 15) { // Next 10
    backgroundColor = '#E57C23'; // Orange
  } else { // Bottom 5
    backgroundColor = '#A42A2A'; // Red
  }
  return {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
    minWidth: 50,
    alignItems: 'center',
    backgroundColor,
  };
};

const PredictScreen = () => {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [nextRace, setNextRace] = useState<Race | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const driversQuery = query(collection(db, 'Drivers'), orderBy("win_probability", "desc"));
        const racesQuery = query(
          collection(db, 'races'),
          where('sessions.race_start_utc', '>', Timestamp.now()),
          orderBy('sessions.race_start_utc'),
          limit(1)
        );

        const [driversSnapshot, raceSnapshot] = await Promise.all([
          getDocs(driversQuery),
          getDocs(racesQuery),
        ]);

        const driversData = driversSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Driver[];
        setDrivers(driversData);

        if (!raceSnapshot.empty) {
          const raceData = raceSnapshot.docs[0].data() as Omit<Race, 'id'>;
          setNextRace({ id: raceSnapshot.docs[0].id, ...raceData });
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      navigation.setOptions({ title: nextRace ? nextRace.race_name : 'Predictions' });
    }
  }, [nextRace, isLoading, navigation]);

  useEffect(() => {
    if (!nextRace) return;

    const timer = setInterval(() => {
      const raceDate = nextRace.sessions.race_start_utc.toDate();
      const now = new Date();
      const difference = raceDate.getTime() - now.getTime();

      if (difference > 0) {
        setCountdown({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [nextRace]);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#ffffff" style={styles.loader} />
      ) : (
        <ScrollView>
          {nextRace ? (
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
          ) : (
            <View style={styles.noRaceContainer}>
              <Text style={styles.noRaceText}>No upcoming races found.</Text>
            </View>
          )}

          <Text style={styles.driversHeader}>
            {nextRace ? 'Predicted Finishing Positions' : 'Driver Power Rankings'}
          </Text>

          {drivers.map((driver, index) => (
            <View key={driver.id} style={styles.driverContainer}>
              <View style={styles.driverInfo}>
                <Image source={{ uri: driver.pictures }} style={styles.driverImage} />
                <View>
                  <Text style={styles.driverName}>{driver.driver}</Text>
                  <Text style={styles.driverTeam}>{driver.teams}</Text>
                </View>
              </View>
              <View style={styles.rightColumn}>
                <View style={getRankChipStyle(index)}>
                  <Text style={styles.probabilityText}>
                    {`${driver.win_probability.toFixed(1)}%`}
                  </Text>
                </View>
                <Text style={styles.driverPosition}>{index + 1}{index === 0 ? 'st' : index === 1 ? 'nd' : index === 2 ? 'rd' : 'th'}</Text>
              </View>
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
    noRaceContainer: {
      padding: 20,
      alignItems: 'center',
    },
    noRaceText: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold',
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
    rightColumn: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 16,
    },
    probabilityText: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 12,
    },
    driverPosition: {
      color: 'white',
      fontSize: 16,
      width: 30, // Ensure consistent width for alignment
      textAlign: 'right',
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
