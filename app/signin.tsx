import { auth } from '@/constants/firebaseConfig';
import { router } from 'expo-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

const SignInScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }
    try {
      await signInWithEmailAndPassword(auth, email, password);
      Alert.alert('Success', 'Signed in successfully!');
      router.replace('/'); // Navigate to the main app screen
    } catch (error) {
      Alert.alert('Error', (error as Error).message);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.contentContainer}>
        <Image source={require('@/assets/images/icon.png')} style={styles.logoSignin} />
        <Text style={styles.title}>Welcome Back</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#c89393"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#c89393"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleSignIn}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cancelButton} onPress={() => router.back()}>
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#221111',
  },
  headerImage: {
    minHeight: 218,
    justifyContent: 'flex-end',
  },
  contentContainer: {
    padding: 16,
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  logoSignin: {
    marginTop: 100,
    width: 250,
    height: 250,
    marginBottom: 0,
  },
  title: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingBottom: 12,
    paddingTop: 20,
  },
  input: {
    backgroundColor: '#472424',
    color: 'white',
    borderRadius: 12,
    height: 56,
    paddingHorizontal: 16,
    fontSize: 16,
    marginBottom: 16,
    width: '100%',
  },
  buttonContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  button: {
    backgroundColor: '#890f0f',
    borderRadius: 9999,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelButton: {
    marginTop: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButtonText: {
    color: '#c89393',
    fontSize: 16,
  },
});

export default SignInScreen;
