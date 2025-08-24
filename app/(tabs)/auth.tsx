import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '@/constants/firebaseConfig';
import AuthHub from './AuthHub';
import ProfileScreen from './profile';

const AuthManager = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#221111' }}>
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    );
  }

  return user ? <ProfileScreen user={user} /> : <AuthHub />;
};

export default AuthManager;
