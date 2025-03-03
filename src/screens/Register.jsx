import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    TouchableWithoutFeedback,
    KeyboardAvoidingView,
    Keyboard,
    Platform,
    Alert,
  } from "react-native";
  import React, { useState } from "react";
  import { SafeAreaView } from "react-native-safe-area-context";
  import LottieView from "lottie-react-native";
  import { TextInput, Button } from "react-native-paper";
  
  const { width, height } = Dimensions.get("window");
  
  const Register = ({navigation}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setusername] = useState("");
    const handleRegister = async() => {
      console.log('Registration button pressed')
    }
    return (
      <SafeAreaView style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.contentContainer}>
            <LottieView
              source={require("../../assets/animations/register.json")}
              style={styles.animation}
              autoPlay
              loop
            />
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
              style={styles.loginContainer}
            >
              <Text style={styles.headerText}>Register</Text>
              <TextInput
                label="Enter username"
                value={username}
                onChangeText={(text) => setusername(text)}
                mode="outlined"
                style={styles.input}
                selectionColor="#7AA3FF"
                autoCapitalize="none"
                theme={{
                    roundness: 30
                }}
              />
              <TextInput
                label="Enter email"
                value={email}
                onChangeText={(text) => setEmail(text)}
                mode="outlined"
                style={styles.input}
                selectionColor="#7AA3FF"
                keyboardType="email-address"
                theme={{
                    roundness: 30
                }}
              />
              <TextInput
                label="Enter password"
                value={password}
                onChangeText={(text) => setPassword(text)}
                mode="outlined"
                style={styles.input}
                selectionColor="#7AA3FF"
                secureTextEntry
                theme={{
                    roundness: 30
                }}
              />
              <Button
                mode="contained"
                onPress={handleRegister}
                buttonColor="#7AA3FF"
                style={styles.button}
              >
                Register
              </Button>
              <Text style={styles.innerText}>
                Already have an account?
                <Text
                  onPress={() => {
                    navigation.navigate("Login");
                  }}
                  style={styles.registerText}
                >
                  {" "}
                  Login
                </Text>
              </Text>
            </KeyboardAvoidingView>
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    );
  };
  
  export default Register;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
    },
    contentContainer: {
      flex: 1,
      alignItems: "center",
    },
    animation: {
      width: width * 0.9,
      height: width * 0.7,
      marginTop: height * 0.1,
    },
    input: {
      width: width * 0.9,
    },
    loginContainer: {
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
    },
    headerText: {
      fontSize: 40,
      fontFamily: "urbanist-bold",
      color: "#7AA3FF",
      marginBottom: height * 0.01,
      marginTop: height * 0.07
    },
    button: {
      padding: 5,
      margin: 10,
      width: width * 0.9,
    },
    innerText: {
      fontSize: 18,
      marginTop: 10,
    },
    registerText: {
      color: "#7AA3FF",
      fontWeight: "bold",
    },
  });
  