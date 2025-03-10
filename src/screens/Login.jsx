import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import LottieView from "lottie-react-native";
import { TextInput, Button } from "react-native-paper";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseConfig";

const { width, height } = Dimensions.get("window");

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const handleLogin = async () => {
    setLoading(true);
    setError("");
    try {
      await signInWithEmailAndPassword(auth,email, password);
      console.log("User logged Successfully");
      //console.trace("Navigating to Home...");
      navigation.navigate("Home");
    } catch (error) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.contentContainer}>
          <LottieView
            source={require("../../assets/animations/login.json")}
            style={styles.animation}
            autoPlay
            loop
          />
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.loginContainer}
          >
            <Text style={styles.headerText}>Login</Text>

            {error ? <Text style={styles.errorText}>{error}</Text> : null}

            <TextInput
              label="Enter Email"
              value={email}
              onChangeText={(text) => setEmail(text)}
              mode="outlined"
              style={styles.input}
              selectionColor="#7AA3FF"
              keyboardType="email-address"
              autoCapitalize="none"
              theme={{ roundness: 30 }}
            />
            <TextInput
              label="Enter Password"
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
              onPress={handleLogin}
              buttonColor="#7AA3FF"
              style={styles.button}
              loading={loading}
              disabled={loading}
            >
              Login
            </Button>

            <Text style={styles.innerText}>
              Don't have an account?
              <Text
                onPress={() => navigation.navigate("Register")}
                style={styles.registerText}
              >
                {" "}
                Register
              </Text>
            </Text>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default Login;

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
  },
  input: {
    width: width * 0.9,
    marginBottom: height * 0.02,
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
    marginBottom: height * 0.03,
    marginTop: height * 0.07,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
    fontSize: 14,
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
