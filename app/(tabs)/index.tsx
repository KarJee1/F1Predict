import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';

const WelcomeScreen = () => {
  return (
    <ImageBackground
      source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDq1IshCi3JBufi-90rMfZ7n-W35Kw6Eykq7-bht0_td2YW1ZNA8nnLzq47ZdM3gTSDO2OBbRhmshd0Rxar7y3vRfjQArKWHjJ2rH_xv0xJICJ9PA_7yLjM4DPGrHDKgKEO92Yh9HFGzdsPRW2VyKt0POAI6GhnrmjYXypUV4Fq0ohEOt0aAW498wv3dl-vLOXmRKPj0wkFeuJYI0lnN7UOCUosqhMuIhPPPuR-cKPRr_Psu60D-I-xNWhigq5R7l6Nt5staRRxRlq-' }}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <View />
        <View>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
          <View style={styles.bottomSpacer} />
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    backgroundColor: '#221111',
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 16,
  },
  button: {
    backgroundColor: '#890f0f',
    borderRadius: 9999,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  bottomSpacer: {
    height: 20,
  },
});

export default WelcomeScreen;
