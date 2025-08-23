import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Svg, Path } from 'react-native-svg';

const data = [
  { name: 'Max Verstappen', width: '30%' },
  { name: 'Charles Leclerc', width: '100%' },
  { name: 'Lando Norris', width: '90%' },
  { name: 'Carlos Sainz', width: '90%' },
  { name: 'Sergio Perez', width: '70%' },
] as const;

const StatisticsScreen = () => {
  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.pageTitle}>Monaco Grand Prix</Text>

        <View style={styles.statsContainer}>
          <View style={styles.chartWrapper}>
            <Text style={styles.chartHeader}>Race Winner</Text>
            <Text style={styles.chartSubHeader}>Fan vs. Model</Text>
            <View style={styles.chartMeta}>
              <Text style={styles.year}>2024</Text>
              <Text style={styles.percentage}>+10%</Text>
            </View>
            <View style={styles.barChart}>
              {data.map((item, index) => (
                <View key={index} style={styles.barRow}>
                  <Text style={styles.barLabel}>{item.name}</Text>
                  <View style={styles.barContainer}>
                    <View style={[styles.bar, { width: item.width }]} />
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#221111',
  },
  pageTitle: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    paddingHorizontal: 16,
    paddingBottom: 12,
    paddingTop: 20,
  },
  statsContainer: {
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  chartWrapper: {
    flex: 1,
    minWidth: 288,
    gap: 8,
  },
  chartHeader: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  chartSubHeader: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
    letterSpacing: -0.5,
  },
  chartMeta: {
    flexDirection: 'row',
    gap: 4,
  },
  year: {
    color: '#c89393',
    fontSize: 16,
  },
  percentage: {
    color: '#0bda0b',
    fontSize: 16,
    fontWeight: '500',
  },
  barChart: {
    minHeight: 180,
    paddingVertical: 12,
    gap: 24, // Replicates gap-y-6
  },
  barRow: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 16, // Gives a consistent height for the bar track
    gap: 16, // Replicates gap-x-4
  },
  barLabel: {
    color: '#c89393',
    fontSize: 13,
    fontWeight: 'bold',
    letterSpacing: 0.2,
    width: 110, // Provides alignment for the bars
  },
  barContainer: {
    flex: 1,
    height: '100%',
  },
  bar: {
    height: '100%',
    backgroundColor: '#472424',
    borderRightWidth: 2,
    borderColor: '#c89393',
  },
});

export default StatisticsScreen;
