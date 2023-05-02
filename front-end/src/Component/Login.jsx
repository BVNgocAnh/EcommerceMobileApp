import { StyleSheet, Text, View, Image } from "react-native";
import React, { useState } from "react";
import InputTextCustom from "../Custom/InputTextCustom";
import Loader from "../Custom/Loader";
import CommonButton from "../Custom/CommonButton";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";

export default function Login({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [badUsername, setBadUsername] = useState(false);
  const [badPassword, setBadPassword] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const { login } = useContext(AuthContext);

  // const checkPasswordValidity = (value) => {
  //   const isNonWhiteSpace = /^\S*$/;
  //   if (!isNonWhiteSpace.test(value)) {
  //     return "Password must not contain Whitespaces.";
  //   }

  //   const isContainsUppercase = /^(?=.*[A-Z]).*$/;
  //   if (!isContainsUppercase.test(value)) {
  //     return "Password must have at least one Uppercase Character.";
  //   }

  //   const isContainsLowercase = /^(?=.*[a-z]).*$/;
  //   if (!isContainsLowercase.test(value)) {
  //     return "Password must have at least one Lowercase Character.";
  //   }

  //   const isContainsNumber = /^(?=.*[0-9]).*$/;
  //   if (!isContainsNumber.test(value)) {
  //     return "Password must contain at least one Digit.";
  //   }

  //   const isValidLength = /^.{8,16}$/;
  //   if (!isValidLength.test(value)) {
  //     return "Password must be 8-16 Characters Long.";
  //   }

  //   return null;
  // };

  console.log(username, password);
  return (
    <View style={{ flex: 1, backgroundColor: "#FFF" }}>
      <Image style={styles.image} source={require("../../assets/logo.png")} />
      <Text style={styles.title}>L O G I N</Text>
      <InputTextCustom
        placeholder={"Enter username"}
        icon={require("../../assets/user.jpg")}
        value={username}
        onChangeText={(txt) => {
          setUsername(txt);
        }}
      />
      {/* {badUsername === true && (
        <Text style={styles.noti}> Please enter your username.</Text>
      )} */}
      <InputTextCustom
        type={"password"}
        placeholder={"Enter password"}
        icon={require("../../assets/password.jpg")}
        value={password}
        onChangeText={(txt) => {
          setPassword(txt);
        }}
      />
      {/* {badPassword === true && (
        <Text style={styles.noti}> Please enter your password.</Text>
      )} */}
      <CommonButton
        title={"Login"}
        bgColor={"#000"}
        textColor={"#fff"}
        onPress={() => {
          login(username, password);
        }}
      />
      <Text
        style={styles.signup}
        onPress={() => {
          navigation.navigate("Signup");
        }}
      >
        You don't have an account? Register here!
      </Text>
      <Loader modalVisible={modalVisible} setModalVisible={setModalVisible} />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "500",
    marginTop: 20,
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
    marginTop: 20,
    textDecorationLine: "underline",
  },
  noti: {
    marginTop: 10,
    marginLeft: 30,
    color: "red",
  },
});

{
  /* <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="username"
            placeholderTextColor="black"
            onChangeText={(email) => setEmail(email)}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="password"
            placeholderTextColor="black"
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}
          />
        </View> */
}

{
  /* <TouchableOpacity style={styles.loginBtn}>
          <Text style={styles.loginText}>LOGIN</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.forgot_button} href="#">
            You don't have an account? Register here!
          </Text>
        </TouchableOpacity> */
}
