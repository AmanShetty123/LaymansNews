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
    ScrollView
  } from "react-native";
  import React, { useState } from "react";
  import { SafeAreaView } from "react-native-safe-area-context";
  import LottieView from "lottie-react-native";
  import { TextInput, Button } from "react-native-paper";
  import { auth, db } from "../../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
  const { width, height } = Dimensions.get("window");
  
  const Register = ({navigation}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");

    const getFormattedDate = (date) => {
      const day = date.getDate();
      const month = new Intl.DateTimeFormat("en-US", { month: "long" }).format(date);
      const year = date.getFullYear();
      
      // Get the correct ordinal suffix (st, nd, rd, th)
      const getOrdinalSuffix = (day) => {
        if (day > 3 && day < 21) return "th";
        switch (day % 10) {
          case 1: return "st";
          case 2: return "nd";
          case 3: return "rd";
          default: return "th";
        }
      };
    
      return `${day}${getOrdinalSuffix(day)} ${month} ${year}`;
    };
    

    const handleRegister = async() => {
      if(!email || !password || !username){
        Alert.alert('Error','All fields are required!');
        return;
      }
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        const formattedDate = getFormattedDate(new Date());
        await setDoc(doc(db, "user", user.uid), {
          uid: user.uid,
          email, 
          username,
          createdAt: formattedDate,
        })
        Alert.alert(
          "Success",
          "User is registered successfully"
        )
        navigation.navigate('Login')
      } catch (error) {
        Alert.alert("Registration Error", error.message);
      }
      // console.log('Registration button pressed')
    }
    return (
      <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.flexContainer}
        >
          <ScrollView
            contentContainerStyle={styles.scrollViewContainer}
            keyboardShouldPersistTaps="handled"
          >
            <LottieView
              source={require("../../assets/animations/register.json")}
              style={styles.animation}
              autoPlay
              loop
            />
            <Text style={styles.headerText}>Register</Text>
            
            <TextInput
              label="Enter username"
              value={username}
              onChangeText={(text) => setUsername(text)}
              mode="outlined"
              style={styles.input}
              selectionColor="#7AA3FF"
              autoCapitalize="none"
              theme={{ roundness: 30 }}
            />

            <TextInput
              label="Enter email"
              value={email}
              onChangeText={(text) => setEmail(text)}
              mode="outlined"
              style={styles.input}
              selectionColor="#7AA3FF"
              keyboardType="email-address"
              theme={{ roundness: 30 }}
            />

            <TextInput
              label="Enter password"
              value={password}
              onChangeText={(text) => setPassword(text)}
              mode="outlined"
              style={styles.input}
              selectionColor="#7AA3FF"
              secureTextEntry
              theme={{ roundness: 30 }}
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
                onPress={() => navigation.navigate("Login")}
                style={styles.registerText}
              >
                {" "} Login
              </Text>
            </Text>
          </ScrollView>
        </KeyboardAvoidingView>
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
    flexContainer: {
      flex: 1,
    },
    scrollViewContainer: {
      flexGrow: 1,
      alignItems: "center",
      paddingVertical: 20,
    },
    animation: {
      width: width * 0.9,
      height: width * 0.7,
      marginTop: height * 0.05,
    },
    input: {
      width: width * 0.9,
      marginBottom: 10,
    },
    headerText: {
      fontSize: 40,
      fontFamily: "urbanist-bold",
      color: "#7AA3FF",
      marginBottom: 20,
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
  