import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Register from "../screens/Register";
import { useFonts } from "expo-font";
import Login from "../screens/Login";
import Home from "../screens/Home";
import { AuthContext } from "../context/authContext";
import { ActivityIndicator, View } from "react-native";
import Profile from "../screens/Profile";
import Bookmarks from "../screens/Bookmarks";
import NewsDetail from "../screens/NewsDetail";

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const { user } = useContext(AuthContext);

  const [fontsLoaded] = useFonts({
    "urbanist-regular": require("../../assets/fonts/Urbanist-Regular.ttf"),
    "urbanist-medium": require("../../assets/fonts/Urbanist-Medium.ttf"),
    "urbanist-bold": require("../../assets/fonts/Urbanist-Bold.ttf"),
  });

  // Show loading indicator while fonts are loading
  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#7AA3FF" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={user ? "Home" : "Login"}>
        {user ? (
          <>
            <Stack.Screen
              name="Home"
              component={Home}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Profile"
              component={Profile}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Bookmarks"
              component={Bookmarks}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="NewsDetail"
              component={NewsDetail}
              options={{ headerShown: false }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Register"
              component={Register}
              options={{ headerShown: false }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
