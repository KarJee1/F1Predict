import AuthHub from '@/components/AuthHub';
import { auth } from '@/constants/firebaseConfig';
import { User, onAuthStateChanged, signOut, updateProfile, sendPasswordResetEmail, deleteUser } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { Alert, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Svg, Path } from 'react-native-svg';

const Profile = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [displayName, setDisplayName] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        setDisplayName(currentUser.displayName || '');
      }
    });
    return () => unsubscribe();
  }, []);

  const handleUpdateProfile = async () => {
    if (auth.currentUser) {
      try {
        await updateProfile(auth.currentUser, { displayName });
        setUser({ ...auth.currentUser, displayName } as User);
        setIsEditing(false);
        Alert.alert('Success', 'Your profile has been updated.');
      } catch (error) {
        Alert.alert('Error', (error as Error).message);
      }
    }
  };

  const handleChangePassword = () => {
    if (user?.email) {
      Alert.alert(
        'Change Password',
        'Are you sure you want to send a password reset email?',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Send',
            onPress: async () => {
              try {
                await sendPasswordResetEmail(auth, user.email!);
                Alert.alert('Success', 'Password reset email sent. Please check your inbox.');
              } catch (error) {
                Alert.alert('Error', (error as Error).message);
              }
            },
          },
        ]
      );
    }
  };
  
  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      Alert.alert('Error', (error as Error).message);
    }
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'Are you sure you want to delete your account? This action is irreversible.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              if (auth.currentUser) {
                await deleteUser(auth.currentUser);
              }
            } catch (error) {
              Alert.alert('Error', (error as Error).message);
            }
          },
        },
      ]
    );
  };

  const ArrowIcon = () => (
    <Svg width="24" height="24" viewBox="0 0 256 256" fill="white">
      <Path d="M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L196.69,136H40a8,8,0,0,1,0-16H196.69L138.34,61.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z" />
    </Svg>
  );

  if (!user) {
    return <AuthHub />;
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileHeader}>
        <Image
          source={{ uri: user.photoURL || 'https://example.com/default-avatar.png' }}
          style={styles.profileImage}
        />
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>{user.displayName || 'User'}</Text>
          <Text style={styles.profileEmail}>{user.email}</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Account</Text>
      {isEditing ? (
        <View style={styles.editProfileContainer}>
          <TextInput
            style={styles.input}
            value={displayName}
            onChangeText={setDisplayName}
            placeholder="Enter your display name"
            placeholderTextColor="#c89393"
          />
          <TouchableOpacity style={styles.saveButton} onPress={handleUpdateProfile}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity style={styles.listItem} onPress={() => setIsEditing(true)}>
          <Text style={styles.listItemText}>Edit Profile</Text>
          <ArrowIcon />
        </TouchableOpacity>
      )}
      <TouchableOpacity style={styles.listItem} onPress={handleChangePassword}>
        <Text style={styles.listItemText}>Change Password</Text>
        <ArrowIcon />
      </TouchableOpacity>
      
      <Text style={styles.sectionTitle}>Preferences</Text>
      <TouchableOpacity style={styles.listItem} onPress={() => Alert.alert('Notifications', 'This feature is not active yet.')}>
        <Text style={styles.listItemText}>Notifications</Text>
        <ArrowIcon />
      </TouchableOpacity>
      <View style={styles.listItem}>
        <Text style={styles.listItemText}>Language</Text>
        <Text style={styles.listItemValue}>English</Text>
      </View>
      <View style={styles.listItem}>
        <Text style={styles.listItemText}>Theme</Text>
        <Text style={styles.listItemValue}>System</Text>
      </View>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
          <Text style={styles.signOutButtonText}>Sign Out</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteAccount}>
          <Text style={styles.deleteButtonText}>Delete Account</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#221111' },
  profileHeader: { flexDirection: 'row', alignItems: 'center', padding: 16, gap: 16 },
  profileImage: { width: 128, height: 128, borderRadius: 64 },
  profileInfo: { justifyContent: 'center' },
  profileName: { color: 'white', fontSize: 22, fontWeight: 'bold' },
  profileEmail: { color: '#c89393', fontSize: 16 },
  sectionTitle: { color: 'white', fontSize: 18, fontWeight: 'bold', paddingHorizontal: 16, paddingBottom: 8, paddingTop: 16 },
  listItem: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, minHeight: 56 },
  listItemText: { color: 'white', fontSize: 16 },
  listItemValue: { color: 'white', fontSize: 16 },
  editProfileContainer: { padding: 16 },
  input: { backgroundColor: '#472424', color: 'white', padding: 12, borderRadius: 8, marginBottom: 12 },
  saveButton: { backgroundColor: '#c89393', padding: 12, borderRadius: 8, alignItems: 'center' },
  saveButtonText: { color: 'white', fontWeight: 'bold' },
  buttonContainer: { margin: 16, marginTop: 32 },
  signOutButton: { backgroundColor: '#472424', borderRadius: 9999, height: 48, alignItems: 'center', justifyContent: 'center' },
  signOutButtonText: { color: '#c89393', fontSize: 16, fontWeight: 'bold' },
  deleteButton: { marginTop: 16, backgroundColor: '#ff3b30', borderRadius: 9999, height: 48, alignItems: 'center', justifyContent: 'center' },
  deleteButtonText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
});

export default Profile;
