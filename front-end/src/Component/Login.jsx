import { StyleSheet, Text, View, Image } from "react-native";
import React, { useState } from "react";
import InputTextCustom from "../Custom/InputTextCustom";
import Loader from "../Custom/Loader";
import CommonButton from "../Custom/CommonButton";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function Login() {
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [badUsername, setBadUsername] = useState(false);
  const [badPassword, setBadPassword] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const login = () => {
    setModalVisible(true);
    if (username == "") {
      setBadUsername(true);
      setModalVisible(false);
    } else {
      setBadUsername(false);
    }
    if (password == "") {
      setBadPassword(true);
      setModalVisible(false);
    } else {
      setTimeout(() => {
        setBadPassword(false);
        getData();
      }, 2000);
    }
  };

  const getData = async () => {
    const mUsername = await AsyncStorage.getItem("USERNAME");
    const mPassword = await AsyncStorage.getItem("PASSWORD");
    console.log(mUsername, mPassword);
    if (username === mUsername && password === mPassword) {
      setModalVisible(false);
      navigation.navigate("HomeScreen");
    } else {
      setModalVisible(false);
    }
  };
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
      {badUsername === true && (
        <Text style={styles.noti}> Please enter your username.</Text>
      )}
      <InputTextCustom
        type={"password"}
        placeholder={"Enter password"}
        icon={require("../../assets/password.jpg")}
        value={password}
        onChangeText={(txt) => {
          setPassword(txt);
        }}
      />
      {badPassword === true && (
        <Text style={styles.noti}> Please enter your password.</Text>
      )}
      <CommonButton
        title={"Login"}
        bgColor={"#000"}
        textColor={"#fff"}
        onPress={() => {
          login();
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
