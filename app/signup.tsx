import { auth } from '@/constants/firebaseConfig';
import { router } from 'expo-router';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import React, { useState } from 'react';
import {
  Alert,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const SignUpScreen = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    if (!fullName || !email || !password) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // Update the user's profile with their full name
      if (userCredential.user) {
        await updateProfile(userCredential.user, { displayName: fullName });
      }
      Alert.alert('Success', 'Account created successfully!');
      router.replace('/'); // Navigate to the main app screen
    } catch (error) {
      Alert.alert('Error', (error as Error).message);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <ImageBackground
       source={require('@/assets/images/icon.png')}
       style={styles.logoSignin}
      />
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Join the F1 Community</Text>
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          placeholderTextColor="#c89393"
          value={fullName}
          onChangeText={setFullName}
        />
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
        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Register</Text>
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
  },
  logoSignin: {
    marginTop: 100,
    width: 250,
    height: 250,
    marginBottom: 0,
    marginLeft : 75
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

export default SignUpScreen;
