import { StyleSheet, Text, View, Image } from "react-native";
import React, { useState } from "react";
import InputTextCustom from "../Custom/InputTextCustom";

import CommonButton from "../Custom/CommonButton";

const AdminLogin = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require("../../assets/logo.png")} />
      <Text style={styles.title}>ADMIN PANEL</Text>
      <InputTextCustom
        placeholder={"Enter username"}
        icon={require("../../assets/user.jpg")}
        value={username}
        onChangeText={(txt) => {
          setUsername(txt);
        }}
      />
      <InputTextCustom
        type={"password"}
        placeholder={"Enter password"}
        icon={require("../../assets/password.jpg")}
        value={password}
        onChangeText={(txt) => {
          setPassword(txt);
        }}
      />

      <CommonButton
        title={"Login"}
        bgColor={"#000"}
        textColor={"#fff"}
        onPress={() => {
          console.log("login in admin panel");
        }}
      />
    </View>
  );
};

export default AdminLogin;
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
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
