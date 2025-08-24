import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';

const AuthHub = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>F1 Predictions</Text>
      <Text style={styles.subtitle}>Sign in or create an account to continue</Text>

      <Link href="/signin" asChild>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
      </Link>
      <View style={styles.spacer} />
      <Link href="/signup" asChild>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#221111',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#c89393',
    textAlign: 'center',
    marginBottom: 32,
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
  spacer: {
    height: 12,
  },
});

export default AuthHub;
