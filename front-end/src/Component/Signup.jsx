import { StatusBar } from "expo-status-bar";
import { StyleSheet, TextInput, View, Button, Text, Image } from "react-native";
import React, { useState } from "react";
import InputTextCustom from "../Custom/InputTextCustom";
import CommonButton from "../Custom/CommonButton";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScrollView } from "react-native-gesture-handler";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";

let isValid = true;

export default function SignUp({ navigation }) {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [emailCus, setEmailCus] = useState(null);
  const [phoneCus, setPhoneCus] = useState(null);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const { register } = useContext(AuthContext);

  return (
    <ScrollView>
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
        {username === null && (
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
        {password === null && (
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
        {confirmPassword === null && (
          <Text style={styles.noti}> Please enter your password again.</Text>
        )}
        <InputTextCustom
          placeholder={"Enter email"}
          value={emailCus}
          onChangeText={(txt) => {
            setEmailCus(txt);
          }}
          icon={require("../../assets/mail.jpg")}
        />
        {emailCus === null && (
          <Text style={styles.noti}> Please enter your email.</Text>
        )}
        <InputTextCustom
          placeholder={"Enter phone number"}
          value={phoneCus}
          keyboardType={"number-pad"}
          onChangeText={(txt) => {
            setPhoneCus(txt);
          }}
          icon={require("../../assets/mobilephone.jpg")}
        />
        {phoneCus === null && (
          <Text style={styles.noti}> Please enter valid phone number.</Text>
        )}
        <CommonButton
          title={"Signup"}
          bgColor={buttonDisabled ? "#8e8e8e" : "#000"}
          textColor={"#fff"}
          onPress={() => {
            register(username, password, emailCus, phoneCus);
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
    </ScrollView>
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
