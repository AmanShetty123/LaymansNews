import { FlatList, StyleSheet, Text, View, ActivityIndicator, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { db, auth } from "../../firebaseConfig";
import NewsCard from "../components/NewsCard";
import { collection, query, where, getDocs } from "firebase/firestore";

const { height, width } = Dimensions.get("window");

const Bookmarks = ({ navigation }) => {
    const [bookmarks, setBookmarks] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchBookmarks = async () => {
        if (!auth.currentUser) return;
  
        setLoading(true);
        try {
          const userId = auth.currentUser.uid;
          const q = query(collection(db, "bookmarks"), where("userId", "==", userId));
          const querySnapshot = await getDocs(q);
          
          const fetchedBookmarks = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));
  
          setBookmarks(fetchedBookmarks);
        } catch (error) {
          console.error("Error fetching bookmarks:", error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchBookmarks();
    }, []);
  
    if (loading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="blue" />
        </View>
      );
    }
  
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.header}>Bookmarks</Text>
        {bookmarks.length === 0 ? (
          <Text style={styles.noBookmarks}>No bookmarks yet</Text>
        ) : (
          <FlatList
            data={bookmarks}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <NewsCard item={item} navigation={navigation} width={width} height={height} />
            )}
          />
        )}
      </SafeAreaView>
    );
  };
  
  export default Bookmarks;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
      backgroundColor: "#fff",
    },
    header: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 10,
    },
    noBookmarks: {
      textAlign: "center",
      fontSize: 16,
      color: "gray",
    },
    loadingContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
  });