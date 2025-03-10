import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from "react-native";
import React, { useContext, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "react-native-paper";
import { AuthContext } from "../context/authContext";
import NewsCard from "../components/NewsCard";
import { NEWS_API_KEY, API_URL } from "@env";
import Ionicons from "@expo/vector-icons/Ionicons";

//
const { height, width } = Dimensions.get("window");
const URL = `${API_URL}${NEWS_API_KEY}`;

const Home = ({navigation}) => {
  const { logout } = useContext(AuthContext);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  //fetch news from Gnews
  const fetchNews = async () => {
    setLoading(true);
    try {
      const response = await fetch(URL);
      const data = await response.json();
      if (data.articles) {
        setArticles(data.articles);
      }
    } catch (error) {
      console.error("Error Fetching error:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <SafeAreaView style={styles.mainContainer}>
      <Text
        style={{
          fontFamily: "urbanist-bold",
          fontSize: 20,
        }}
      >
        Laymans News
      </Text>
      {loading ? (
        <ActivityIndicator size="large" color="blue" />
      ) : (
        <FlatList
          data={articles}
          renderItem={({ item }) => (
            <NewsCard item={item} navigation={navigation} width={width} height={height} />
          )}
          keyExtractor={(item) => item.url} // ✅ Use unique URL as key
          showsVerticalScrollIndicator={false}
        />
      )}
       <Button mode="contained" onPress={fetchNews}>Fetch News</Button>
      {/* <Button mode="contained" onPress={logout}>
        SignOut
      </Button>  */}
      <View style={styles.bottomBar}>
        <View>
          <Ionicons name="person" size={30} color="black" onPress={() => navigation.navigate('Profile')} />
        </View>
        <View>
          <Ionicons name="bookmarks" size={30} color="black" onPress={() => navigation.navigate('Bookmarks')} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  bottomBar: {
    width: width * 0.9,
    height: height*0.05,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
});
