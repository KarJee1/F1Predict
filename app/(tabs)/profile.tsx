import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Alert } from 'react-native';
import { Svg, Path } from 'react-native-svg';
import { User, signOut } from 'firebase/auth';
import { auth } from '@/constants/firebaseConfig';

interface ProfileScreenProps {
  user: User;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ user }) => {
  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      Alert.alert('Error', (error as Error).message);
    }
  };

  const ListItem = ({ label, value }: { label: string; value?: string }) => (
    <View style={styles.listItem}>
      <Text style={styles.listItemText}>{label}</Text>
      {value ? (
        <Text style={styles.listItemValue}>{value}</Text>
      ) : (
        <Svg width="24" height="24" viewBox="0 0 256 256" fill="white">
          <Path d="M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L196.69,136H40a8,8,0,0,1,0-16H196.69L138.34,61.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z" />
        </Svg>
      )}
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileHeader}>
        <Image 
          source={{ uri: user.photoURL || 'https://lh3.googleusercontent.com/aida-public/AB6AXuAYENwg-r67i8E2mSAw6wF3cTmny0aDcaBEFnrN0bf5TYqsk8ABXr1_SpZ4xFQFUrxw2R5WUIwOm5AL6q1E_p--j2Aiqk8kQjRsAyecN9hvrvxdK1kwtDWKXsSVzzB3pFtU3sDX2vt5sIKZdqvvhxn6DvE_xDgliJUCvswIxavf0enuXAHMsbOYplfvEEAzOo1PwBn69pPSawvtm1BFcGXTYZVkOBQgV_QIEcLVgO9X-odazRkYpPdfDC3rg4Y24ibBkC8OdrrZpKKT' }} 
          style={styles.profileImage} 
        />
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>{user.displayName || 'User'}</Text>
          <Text style={styles.profileEmail}>{user.email}</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Account</Text>
      <ListItem label="Edit Profile" />
      <ListItem label="Change Password" />

      <Text style={styles.sectionTitle}>Preferences</Text>
      <ListItem label="Notifications" />
      <ListItem label="Language" value="English" />
      <ListItem label="Theme" value="System" />
      
      <View style={styles.signOutButtonContainer}>
        <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
            <Text style={styles.signOutButtonText}>Sign Out</Text>
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
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 16,
  },
  profileImage: {
    width: 128,
    height: 128,
    borderRadius: 64,
  },
  profileInfo: {
    justifyContent: 'center',
  },
  profileName: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
  profileEmail: {
    color: '#c89393',
    fontSize: 16,
  },
  sectionTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    paddingHorizontal: 16,
    paddingBottom: 8,
    paddingTop: 16,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#221111',
    paddingHorizontal: 16,
    minHeight: 56,
  },
  listItemText: {
    color: 'white',
    fontSize: 16,
  },
  listItemValue: {
    color: 'white',
    fontSize: 16,
  },
  signOutButtonContainer: {
    margin: 16,
    marginTop: 32,
  },
  signOutButton: {
    backgroundColor: '#472424',
    borderRadius: 9999,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signOutButtonText: {
    color: '#c89393',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
