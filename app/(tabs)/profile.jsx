import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { auth, db } from '../../configs/FirebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Colors } from '../../constants/Colors';

export default function Profile() {
  const navigation = useNavigation();
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [fullName, setFullName] = useState('');

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUser(currentUser);

      // Fetch full name from Firestore
      const fetchUserData = async () => {
        try {
          console.log("Fetching user data for:", currentUser.uid);
          const userDoc = await getDoc(doc(db, "users", currentUser.uid));

          if (userDoc.exists()) {
            console.log("User data:", userDoc.data());
            setFullName(userDoc.data().fullName);
          } else {
            console.log("User document not found in Firestore.");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };

      fetchUserData();
    }
  }, []);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        router.replace('/auth/sign-in');
      })
      .catch((error) => {
        console.error("Logout Error:", error);
      });
  };

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={28} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Profile</Text>
      </View>

      {/* User Info */}
      <View style={styles.userInfo}>
        <Text style={styles.infoText}>{fullName ? fullName : 'Guest User'}</Text>
        <Text style={styles.infoText}>Email: {user?.email}</Text>
      </View>

      {/* Logout Button */}
      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    paddingTop: 50,
    backgroundColor: Colors.WHITE,
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  backButton: {
    position: 'absolute',
    left: 0,
    padding: 10,
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontFamily: 'outfit-bold',
    fontSize: 28,
  },
  userInfo: {
    alignItems: 'center',
    marginTop: 20,
  },
  infoText: {
    fontSize: 18,
    fontFamily: 'outfit',
    marginTop: 10,
  },
  logoutButton: {
    padding: 15,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 10,
    marginTop: 40,
    width: '80%',
    alignItems: 'center',
  },
  logoutText: {
    color: Colors.WHITE,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

