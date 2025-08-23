import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { Svg, Path } from 'react-native-svg';

const leaderboardData = [
  {
    name: 'Max Verstappen',
    position: '1st',
    points: 120,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuApDVDzdmFp2AzatppEPIoDKVG5pvQxzUsmP4g8B8F3ePwiai2y9uXbNnecMkIlKMV40IiLcYHuM9fbQh2GsILOg0lQVuEnqKWR7K1xxuFqR0Y_cxAUxPcX9GkMA5xR78SE_1IDxybQEG2SxfRp1p8J4xYB_Pt3Edb6HUl64wwhcNZnx7xa7qy5JSVSWrT2d-9CgOFtSzuwbRcEX8Y6gXchXc90Oy2pBCjEjvxw_1EKqXFUdeniqvmN-TPo59lVuDam9y5IfQuaQHh7',
  },
  {
    name: 'Charles Leclerc',
    position: '2nd',
    points: 115,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCJGmh8RfAA9iXX-EvIy_Gb_U0pn46ZoAZMRJwJOaEfWY27kbQtFVWYg90i5p4ER5-rf0R1Gosi8LDCDuNsCUv0CkugdEraBcFDZi2MADncvCoxsxfLQ5Y2gcjM8KX3o_siDObTloyMegS5Ryih7vsEtqGH4g8pHLjdVKDNgtl7mRdvFbN1bhbMJ_b4qws7wHvcwstijJVPwYEr72EIGI6PL7HR5yDaS1fPesPcgOhpUttjgsuwTNIFExf_QpOBoh2QhXw_d1lMh8yE',
  },
  {
    name: 'Sergio Perez',
    position: '3rd',
    points: 110,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAyriX9_ShpfqwOkJAsiVBq9JZ-IzxYQJbPk3imh14I6jXdqKKYRcgDOlAd8Z6UCGl0p-kkgc7R0b8N2acx22drqpm6S6y41uRmBEhu9nungiBNTHyE_q-3Pfh0_0W3QfDmfogV2wK7t_c-yWskFYCsvjGH8VGzL_jjq1q2f3IRFBXMHjuche0FSH0xXYEaTBbf2CtvD0mlJ5WLHbMVPG8YjkYfdxh8pVpU31V0Ppgjx-CydNkU9poWhTM3yJ3eAHu-IV-fKBu2IWX8',
  },
  {
    name: 'Carlos Sainz',
    position: '4th',
    points: 105,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDPmsjiO-wGyuKCDrF5A0lPBJVOau67xQWN2bLmLRygybQdKlKlsXjth2BQZRKTAqICB28_e5VMVVVAaa4P5Xdwy8j0yWLgVILFPCHovddsGReNAL1ZKg2QmKSkYEFwO0GxI3YMxgWlD7nI5ZAu8U1XknojNPHe0w0NccFgpWupa8OokW46FvF4KXJsJNHA9d_l0gXvIdgFq7JnvmVul8vYaSkdnA-cInBTA_KwwemzthCFXPPCfMuKW2Aj81I35hq5aFAuJ6Bm83Fq',
  },
  {
    name: 'George Russell',
    position: '5th',
    points: 100,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDiq89cnxcbD-cP0sBO8uZHru2h8VhRwXj69PHCXsi5nxYgLGEdpBGvQR2kFs1G_1W-pUpb8Q3W_X5jdLQzg8Hk3qnMKBQUxEAUEie6xI8qy8GmwHprxd66cQAxAUIglBgvKnVDnwdqILRpazrUOXyp76BsE3WRZyLNetUqvKu-veROF4TRLiz5T3Fa8mReujaBUB5EqX5TedUbCP0uYjTbpVZYKl2lqbn8MdgrrgQHAXKi78rKN8qfwB06o755DEaMrsB0izbKnjeW',
  },
  {
    name: 'Lewis Hamilton',
    position: '6th',
    points: 95,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuABGsqk1xuROka-Ahscd8cM_aVTN9LbT63ro9HNDPim3D30CFzi8Uiz-rO1nVfZimCC3RpMknxyFor37MFtyGozACpXRAg-ZFQ_MPjgTRrJII63Jhf4_mm4xQQy1Lwt-9Ils4igneJoTeKq0YKH7hFOoqiaUulW726sGfdNpkW5wFJgN59m01au2scMZugYUfXGfc_NwXkYR0QYhkz9aMpnhV9-SWmkc7LjXrYcE0eq5CVUd1q5lcZijam8gYe7GYZL9kT7g9xWbed8',
  },
  {
    name: 'Lando Norris',
    position: '7th',
    points: 90,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBnynicFnqK1kMc-hqGXGJjzkhkA3oviEjtKYaXMhxkwN0aLUaQBGgXWgxRejGyH2pyzHGesnNAXocNXGyFZasaYaopxdX-sr5lKgVZ3-binB96tdSRmg0y36MyHXPlZXPSrVt6MqAj94R8v0hY_sHDV_YLzdyZ2AdG_Pe2iZYGxh9f0jgbnUSk9Xke4g4Hqbth7rnPBhiF9n8gDtDAbJXD1cjJm0hhBsyCHDkfLgIQqjw7U9_wZcLEU-NCfvGJnX666PRxpmGClZ2n',
  },
  {
    name: 'Fernando Alonso',
    position: '8th',
    points: 85,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB2aD7JdFHvN4kq3K7J12gzBW-pHdTLVYRMuBm5wSE7l3ZH6MqrHlKRopNqF7fe2RwLXuZ_POpEMKvfiVCr0-pEas8LxjC_jc8H6KTBWsKVuq9CxQrpiSkfmdegGBtEoaQBq0fcYinypfQZkZmdj6RgHqRBKNwNI0gDdCR1ewo7VJSkyI-UIFXKwmpwgnkxvUkeL8aLSbtAHvNnjXegd02_E29-u6sNyTm4CiMjQ83Fnp-pais3JiFuiZmlWE0SQDQXSq21vyhWrzPs',
  },
  {
    name: 'Esteban Ocon',
    position: '9th',
    points: 80,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB_SmpBpsFxJI22UJ9qIxxuZyHD1nmW1WgC9SviKpp1e4yVM9HW5zyH7MdoaCWWQ34OzSnLsisP9eBVI---AvQwnsMLCjGGphpI7uSz6GdjBY2NPWtgqPY0fCP1Ak09striOF_jsGobYczZ-RTcJ9JsiL8GkhizZL5E9HjxD6GIBecft-ah2C2WRRd-zhvfRbxK1nKFH3QsZm9x9n6N-tOj6FvTTiNt7NMxe_T8qv8ZlaM67d3bpWtEQgOo4S0x-n9JueyHKayOASeX',
  },
  {
    name: 'Pierre Gasly',
    position: '10th',
    points: 75,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD_lmVDh942SclXQSyn1yY0w32PCVhvZPXMvuS4y5K2qVOVo-oVZmmIrIR3C00GBw9bEpjTaHT8lasVNPcu8pUhZGzUrSgMi4FJjUP_2nI4LIRcsdR8RTEmaVpCWVuWdTiprZdPzltQzgaQQzvTp2w_XNCdJFVWGRmJgGHqnVJpXDiT3mWpxMDsFL0rEGi_w4Mf52pTcUJCPssyyHkYcMpneA9ADazxiwNUDzT9WqWrY77FGxtv6TVdbuswyY2_Yq9JmkYMTY4n1G1W',
  },
];

const LeaderboardScreen = () => {
  return (
    <View style={styles.container}>
      <ScrollView>
        {leaderboardData.map((driver, index) => (
          <View key={index} style={styles.driverContainer}>
            <View style={styles.driverInfo}>
              <Image source={{ uri: driver.imageUrl }} style={styles.driverImage} />
              <View>
                <Text style={styles.driverName}>{driver.name}</Text>
                <Text style={styles.driverPosition}>{driver.position}</Text>
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
