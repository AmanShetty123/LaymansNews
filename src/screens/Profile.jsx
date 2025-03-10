import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthContext } from "../context/authContext"; // Import Auth Context
import { useNavigation } from "@react-navigation/native";
import { db } from "../../firebaseConfig"; // Import Firebase Firestore
import { doc, getDoc } from "firebase/firestore";

const Profile = () => {
  const { user, logout } = useContext(AuthContext);
  const navigation = useNavigation();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      if (user?.uid) {
        try {
          const userDoc = await getDoc(doc(db, "user", user.uid)); // Fetch user data from Firestore
          if (userDoc.exists()) {
            setProfileData(userDoc.data()); // Store the user data
          } else {
            console.log("User document not found!");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchProfile();
  }, [user]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {profileData ? (
        <>
          <Text style={styles.name}>Username : {profileData.username}</Text>
          <Text style={styles.email}>Email : {profileData.email}</Text>
          <Text style={styles.bio}>Joined on {profileData.createdAt}</Text>
          <TouchableOpacity style={styles.logoutButton} onPress={logout}>
            <Text style={styles.logoutText}>Sign Out</Text>
          </TouchableOpacity>
        </>
      ) : (
        <Text style={styles.errorText}>User data not found.</Text>
      )}
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: 'center',
    padding: 20,
    backgroundColor: "#fff",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
  },
  email: {
    fontSize: 16,
    color: "gray",
    marginVertical: 5,
  },
  bio: {
    fontSize: 14,
    color: "black",
    textAlign: "center",
    marginVertical: 10,
  },
  logoutButton: {
    marginTop: 20,
    backgroundColor: "#d9534f",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  logoutText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  errorText: {
    fontSize: 16,
    color: "red",
  },
});
