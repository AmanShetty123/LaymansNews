import {
    View,
    Text,
    Image,
    StyleSheet,
    ScrollView,
    ActivityIndicator,
    Alert,
  } from "react-native";
  import React, { useState, useEffect } from "react";
  import { Button } from "react-native-paper";
  import { GoogleGenerativeAI } from "@google/generative-ai";
  import { GEMINI_API_KEY } from "@env";
  import { SafeAreaView } from "react-native-safe-area-context";
  import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
  import { db, auth } from "../../firebaseConfig"; // Ensure correct path to your firebaseConfig
  
  const NewsDetail = ({ route }) => {
    const { article } = route.params;
    const [summary, setSummary] = useState(null);
    const [loading, setLoading] = useState(false);
    const [bookmarked, setBookmarked] = useState(false);
  
    const generateSimplifiedText = async () => {
      setLoading(true);
      try {
        const prompt = `Summarize this news article in a simple paragraph that a 15-year-old can easily understand:\n\nTitle: ${article.title}\nDescription: ${article.description}`;
  
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [{ parts: [{ text: prompt }] }],
            }),
          }
        );
  
        const data = await response.json();
  
        if (data.candidates && data.candidates.length > 0) {
          setSummary(data.candidates[0].content.parts[0].text);
        } else {
          setSummary("Failed to generate summary.");
        }
      } catch (error) {
        console.error("Error generating summary:", error);
        setSummary("Error: Could not generate explanation.");
      } finally {
        setLoading(false);
      }
    };
  
    const checkIfBookmarked = async () => {
      try {
        const user = auth.currentUser;
        if (!user) return;
  
        const bookmarksRef = collection(db, "bookmarks");
        const q = query(bookmarksRef, where("userId", "==", user.uid), where("title", "==", article.title));
        const querySnapshot = await getDocs(q);
  
        if (!querySnapshot.empty) {
          setBookmarked(true);
        }
      } catch (error) {
        console.error("Error checking bookmark:", error);
      }
    };
  
    useEffect(() => {
      checkIfBookmarked();
    }, []);
  
    const addBookmark = async () => {
      try {
        const user = auth.currentUser;
        if (!user) {
          Alert.alert("Login required", "You need to be logged in to bookmark articles.");
          return;
        }
  
        const bookmarksRef = collection(db, "bookmarks");
        await addDoc(bookmarksRef, {
          userId: user.uid,
          title: article.title,
          description: article.description,
          image: article.image,
          source: article.source.name,
          timestamp: new Date(),
        });
  
        setBookmarked(true);
        Alert.alert("Success", "Article bookmarked successfully!");
      } catch (error) {
        console.error("Error adding bookmark:", error);
        Alert.alert("Error", "Failed to bookmark the article.");
      }
    };
  
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <Image source={{ uri: article.image }} style={styles.image} />
          <Text style={styles.title}>{article.title}</Text>
          <Text style={styles.source}>Source: {article.source.name}</Text>
          <Text style={styles.description}>{article.description}</Text>
  
          {/* Generate Summary Button */}
          <Button mode="contained" onPress={generateSimplifiedText} disabled={loading}>
            {loading ? "Generating..." : "Do Magic"}
          </Button>
  
          {/* Show Loading Indicator */}
          {loading && <ActivityIndicator size="large" color="blue" style={{ marginTop: 10 }} />}
  
          {/* Display Summary */}
          {summary && (
            <View style={styles.summaryBox}>
              <Text style={styles.summaryTitle}>Simplified Explanation:</Text>
              <Text style={styles.summary}>{summary}</Text>
            </View>
          )}
  
          {/* Bookmark Button */}
          <Button
            mode="contained"
            onPress={addBookmark}
            disabled={bookmarked}
            style={{ marginTop: 10, backgroundColor: bookmarked ? "gray" : "#ff6600" }}
          >
            {bookmarked ? "Bookmarked" : "Add Bookmark"}
          </Button>
        </ScrollView>
      </SafeAreaView>
    );
  };
  
  export default NewsDetail;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
      backgroundColor: "#fff",
    },
    image: {
      width: "100%",
      height: 200,
      borderRadius: 10,
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
      marginVertical: 10,
    },
    source: {
      fontSize: 14,
      color: "gray",
      marginBottom: 5,
    },
    description: {
      fontSize: 16,
      marginBottom: 10,
    },
    summaryBox: {
      marginTop: 15,
      padding: 10,
      backgroundColor: "#f2f2f2",
      borderRadius: 10,
    },
    summaryTitle: {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 5,
    },
    summary: {
      fontSize: 16,
      color: "#333",
    },
  });
  