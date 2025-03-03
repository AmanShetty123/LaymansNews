import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Register from "../screens/Register";
import { useFonts } from "expo-font";
import Login from "../screens/Login";

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
    const [fontsLoaded] = useFonts({
        "urbanist-regular": require("../../assets/fonts/Urbanist-Regular.ttf"),
        "urbanist-medium": require("../../assets/fonts/Urbanist-Medium.ttf"),
        "urbanist-bold": require("../../assets/fonts/Urbanist-Bold.ttf"),
    })

    if(fontsLoaded){
        return (
            <NavigationContainer>
              <Stack.Navigator initialRouteName="Login">
                <Stack.Screen name="Register" component={Register} options={{headerShown: false}} />
                <Stack.Screen name="Login" component={Login} options={{headerShown: false}} />
              </Stack.Navigator>
            </NavigationContainer>
          );
    }
};

export default AppNavigator;
