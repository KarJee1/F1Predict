import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Svg, Path } from 'react-native-svg';

const PredictScreen = () => {
  return (
    <View style={styles.container}>
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

        <Text style={styles.driversHeader}>Predict Finishing Positions</Text>

        <View style={styles.driverContainer}>
          <View style={styles.driverInfo}>
            <Image
              source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBsGEKYXtKtJvT4K4VH3dds-3s60ItYVHQ6-xeNJN70tPnUYny-F33aY8lz-NibjgUlAm2sMuaGQ3HOzchd5dpdrCz76tFbuL3yFbZYZP7Hnu2D3OCNYPAPcSe1XaDkmt0H6PWY-Bb_Ame0eTxFWN0b8iBMrqMd303Fr0MZBDyLDCdxhZMaTft1lK3QV3gqLtgFOiZovbkLOQ2IyXT10FuxloUr85jkVKXaSx6kj44m32AuAD-7nCqVoSA26pPex6wIv6duixHVJR3b' }}
              style={styles.driverImage}
            />
            <View>
              <Text style={styles.driverName}>Max Verstappen</Text>
              <Text style={styles.driverTeam}>Red Bull Racing</Text>
            </View>
          </View>
          <Text style={styles.driverPosition}>1st</Text>
        </View>

        <View style={styles.driverContainer}>
          <View style={styles.driverInfo}>
            <Image
              source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB88cFKfwkrYs-rhL-Ix6rSFpK3wl5s2WbeSI-hklK_iHp5P3zubsyiRZxt9vUx4QetaWTPeWelqjcGmz4wT-CJRpEAlzP-tHs5HAC9R9w0fn5tfh6My2qTn4F6lcIFKtceblwYKkHdicLjE1eZY_RYwwskAkMJ_mtK3wBmUVkbxQxcrspz4Y3BJWIhgbRXF4KC_d_Jp6kRDCe8thFlaY3mr2D2AeYRhZ4DDm6re7Pnrg0Ij2h0lhC5r6uIrjBiL099qOki7dR_Jdll' }}
              style={styles.driverImage}
            />
            <View>
              <Text style={styles.driverName}>Charles Leclerc</Text>
              <Text style={styles.driverTeam}>Ferrari</Text>
            </View>
          </View>
          <Text style={styles.driverPosition}>2nd</Text>
        </View>

        <View style={styles.driverContainer}>
          <View style={styles.driverInfo}>
            <Image
              source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBKENYouAXYnn8_dnhDh2oyA0cZzC3y2ujmcD5jrbaqAdJutGpVDELWuigPIkHrDXRFEq9eMGibjewZ4SYgMZt0gq_QudgG6k4_9bY9CvN6FXAgu70CTkPk1PREHuVTsuYcMu3AMX9FstJWXxBp2OLQUPpY3zssXRkgRYaWAurXbcMeLJgH-fkWHYuqN7LLM-UkMeFyQ6SsLq2VVRYV74WrMdvZkKJylSxR26g41B-WW9mSYZZAZGQQQnHSjXWnWzNTZQ13iKJpQShP' }}
              style={styles.driverImage}
            />
            <View>
              <Text style={styles.driverName}>Lewis Hamilton</Text>
              <Text style={styles.driverTeam}>Mercedes</Text>
            </View>
          </View>
          <Text style={styles.driverPosition}>3rd</Text>
        </View>

        <View style={styles.driverContainer}>
          <View style={styles.driverInfo}>
            <Image
              source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDZMAZEdl_FCNT_BbYd5e_PRTQlgOp2e4fi45048SRTiXc9KuSwYwR0Sx0BTSaDlRSv97wOFYfTMGg7n7HsVK0N8otncoYe5J4rDow13V_1_iTnPS6eZBIPB8ml3Db46rBO-rTxg5FFpes-8tIVwl1JE5HH4pbj30snlQCi8HOvqCUDLxPjEeO8zXn1Kr-D880eDwkiOUGDmtcytjS_lLOkvu_Ri_RJsSPnaHWEm-KGouJC9C7Lw-_kYRBFzytK29gTRMXDK6zEBo4C' }}
              style={styles.driverImage}
            />
            <View>
              <Text style={styles.driverName}>Lando Norris</Text>
              <Text style={styles.driverTeam}>McLaren</Text>
            </View>
          </View>
          <Text style={styles.driverPosition}>4th</Text>
        </View>

        <View style={styles.driverContainer}>
          <View style={styles.driverInfo}>
            <Image
              source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB-Mu3QOZsXVE6rCACx6JObbgu9VO1AUKefl0Zx3MmXiMdFjGrccrpNl51fO-iyfvMl8T4ZDEq7art3iUAARjJOLASUEsz7Ojt_xiR1QaXRZ0X9eQFHDQECqK9WQ7PKahZCd7ilcV-qlCzeBvoKFiD9pHKU3s6QpzdrChiNFWfbDcCo9JK_tLhiKfOvic0sNSW41RjPjiSZN5f2G93Wc45xU4jCQXnghq6BoY0zksiBqEV-oxW1wVQ47M3vSHdMSfa4uZkMnfKqpvki' }}
              style={styles.driverImage}
            />
            <View>
              <Text style={styles.driverName}>Carlos Sainz</Text>
              <Text style={styles.driverTeam}>Ferrari</Text>
            </View>
          </View>
          <Text style={styles.driverPosition}>5th</Text>
        </View>

        <View style={styles.driverContainer}>
          <View style={styles.driverInfo}>
            <Image
              source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBG56pISKSz3gT9qeFTwPT3ZNuqH8kFEM_sh8f-D6HxIpdmlNrH7VWQQ3e4WLO_0d0cqqy7vmhfIEB6L2SuRW-wRmHZot5YCNKYrkWiNtgBwRO3bHqEydxGuDUnLfWTC3X23tTvHHXdRE1EPJ09BNx0zHo-RJrHhMfxaeylOfB9Kbhgsi2UAtycbxNg1fG-AehR_jkFL39ZNHpjsKXxLnfwC9Uyj6glveUqP9XgADbzVWgbrcZGpU7vtb5aAL29TG_mWszKjzEbxHKV' }}
              style={styles.driverImage}
            />
            <View>
              <Text style={styles.driverName}>George Russell</Text>
              <Text style={styles.driverTeam}>Mercedes</Text>
            </View>
          </View>
          <Text style={styles.driverPosition}>6th</Text>
        </View>

        <View style={styles.driverContainer}>
          <View style={styles.driverInfo}>
            <Image
              source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA5cg1NYcp2EPhmYNQi2rrg_PL5CYuWbFxtZsqklv8CpmNBzhWpW-LQ1bDS7EK68bdQ1TwXlG4i34EOD8uQ-JFjEZvCREN1QY4whVsHsdk4ppuN-TvPxBv6Pft58Gqc7evdeDenRuMfAhr_3qgfeLLhEohBG5x2Gw2z-cER3we240xJByTPqrTX0CesavpzdsJy6q2qJPc6feIDjmiQyUR0qQbUvtUuZjf8pretA-JKtgcnyckiGTt1HZEjAkmCmOMVzwUfECnz8_H-' }}
              style={styles.driverImage}
            />
            <View>
              <Text style={styles.driverName}>Fernando Alonso</Text>
              <Text style={styles.driverTeam}>Aston Martin</Text>
            </View>
          </View>
          <Text style={styles.driverPosition}>7th</Text>
        </View>

        <View style={styles.driverContainer}>
          <View style={styles.driverInfo}>
            <Image
              source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDn7QS1EnQz_pL9XQUJ72TfHI-UC_jyI3Mf1lkc5BKx9MojUXB0wfJrQDbnLHNwy0wVTxC3dGa3VgoUDzoo4ZGiypkiSvKLvWZ_kgi1HiYZwAK187WtgfrkFR5g3JvBHu-egfPLsn3n5C3O8cX6t5J4wuJs9Ln9aAk6uSi145A2Tp0UflfVOtvo3U0MbI085xEcpw0Owu9KWyU2Frhtpb0CYmGiGvf8vAEKA3yja1NQZ-QlzxYHHFcQTBCLnoQK7GXvcwYPJqCwEj6R' }}
              style={styles.driverImage}
            />
            <View>
              <Text style={styles.driverName}>Sergio Perez</Text>
              <Text style={styles.driverTeam}>Red Bull Racing</Text>
            </View>
          </View>
          <Text style={styles.driverPosition}>8th</Text>
        </View>

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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#221111',
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
