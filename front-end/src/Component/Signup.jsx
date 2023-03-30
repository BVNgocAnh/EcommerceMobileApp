import { StatusBar } from "expo-status-bar";
import { StyleSheet, TextInput, View, Button, Text, Image } from "react-native";
import React, { useState } from "react";
import InputTextCustom from "../Custom/InputTextCustom";
import CommonButton from "../Custom/CommonButton";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
let isValid = true;

export default function SignUp() {
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [badUsername, setBadUsername] = useState(false);
  const [password, setPassword] = useState("");
  const [badPassword, setBadPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [badConfirmPassword, setBadConfirmPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [badEmail, setBadEmail] = useState(false);
  const [mobilephone, setMobilephone] = useState("");
  const [badMobilephone, setBadMobilephone] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const signup = () => {
    setButtonDisabled(true);
    if (username == "") {
      setBadUsername(true);
      isValid = false;
    } else {
      setBadUsername(false);
    }
    if (password == "") {
      setBadPassword(true);
      isValid = false;
    } else {
      setBadPassword(false);
    }
    if (confirmPassword == "") {
      setBadConfirmPassword(true);
      isValid = false;
    } else {
      setBadConfirmPassword(false);
    }
    if (password != confirmPassword) {
      setBadConfirmPassword(true);
      isValid = false;
    } else {
      setBadConfirmPassword(false);
    }
    if (email == "") {
      setBadEmail(true);
      isValid = false;
    } else {
      setBadEmail(false);
    }
    if (mobilephone == "") {
      setBadMobilephone(true);
      isValid = false;
    } else if (mobilephone.length < 10) {
      setBadMobilephone(true);
      isValid = false;
    } else {
      setBadMobilephone(false);
    }

    setTimeout(() => {
      console.log(isValid);
      if (isValid === true) {
        saveData();
      } else {
        setButtonDisabled(false);
      }
    }, 2000);
  };

  const saveData = async () => {
    await AsyncStorage.setItem("USERNAME", username);
    await AsyncStorage.setItem("PASSWORD", password);
    await AsyncStorage.setItem("EMAIL", email);
    await AsyncStorage.setItem("MOBILE", mobilephone);
    console.log("yes");
    navigation.goBack();
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#FFF" }}>
      <Image style={styles.image} source={require("../../assets/logo.png")} />
      <Text style={styles.title}>SIGNUP</Text>
      <InputTextCustom
        placeholder={"Enter username"}
        value={username}
        onChangeText={(txt) => {
          setUsername(txt);
        }}
        icon={require("../../assets/user.jpg")}
      />
      {badUsername === true && (
        <Text style={styles.noti}> Please enter your username.</Text>
      )}
      <InputTextCustom
        type={"password"}
        placeholder={"Enter password"}
        value={password}
        onChangeText={(txt) => {
          setPassword(txt);
        }}
        icon={require("../../assets/password.jpg")}
      />
      {badPassword === true && (
        <Text style={styles.noti}> Please enter your password.</Text>
      )}

      <InputTextCustom
        type={"password"}
        placeholder={"Confirm password"}
        value={confirmPassword}
        onChangeText={(txt) => {
          setConfirmPassword(txt);
        }}
        icon={require("../../assets/confirmpassword.jpg")}
      />
      {badConfirmPassword === true && (
        <Text style={styles.noti}> Please enter your password again.</Text>
      )}
      <InputTextCustom
        placeholder={"Enter email"}
        value={email}
        onChangeText={(txt) => {
          setEmail(txt);
        }}
        icon={require("../../assets/mail.jpg")}
      />
      {badEmail === true && (
        <Text style={styles.noti}> Please enter your email.</Text>
      )}
      <InputTextCustom
        placeholder={"Enter phone number"}
        value={mobilephone}
        keyboardType={"number-pad"}
        onChangeText={(txt) => {
          setMobilephone(txt);
        }}
        icon={require("../../assets/mobilephone.jpg")}
      />
      {badMobilephone === true && (
        <Text style={styles.noti}> Please enter valid phone number.</Text>
      )}
      <CommonButton
        title={"Signup"}
        bgColor={buttonDisabled ? "#8e8e8e" : "#000"}
        textColor={"#fff"}
        onPress={() => {
          signup();
        }}
        disabled={buttonDisabled}
      />
      <Text
        style={styles.signup}
        onPress={() => {
          navigation.navigate("Login");
        }}
      >
        Already have account? Click here to Login!
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "500",
    marginTop: 0,
    alignSelf: "center",
    justifyContent: "center",
  },
  image: {
    height: 130,
    width: 130,
    marginTop: 100,
    alignSelf: "center",
  },
  signup: {
    fontSize: 15,
    fontWeight: "600",
    alignSelf: "center",
    marginTop: 10,
    textDecorationLine: "underline",
  },
  noti: {
    marginTop: 10,
    marginLeft: 30,
    color: "red",
  },
});
