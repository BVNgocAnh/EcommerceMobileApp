import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Button,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CommonButton from "../Custom/CommonButton";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";

export default function Profile() {
  const userInfo = useContext(AuthContext);
  const { logout } = useContext(AuthContext);
  const navigation = useNavigation();
  const handleLogout = () => {
    logout();
  };
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.Profile}>
        <Text style={styles.profile}>Profile</Text>
        <TouchableOpacity style={styles.setting}>
          <Image
            source={require("../../assets/setting.jpg")}
            style={{ width: 24, height: 24 }}
          />
        </TouchableOpacity>
      </View>
      <Image
        source={require("../../assets/profile.jpg")}
        style={{ width: 80, height: 80, alignSelf: "center", marginTop: 30 }}
      />
      <Text style={{ alignSelf: "center", marginTop: 20, fontSize: 18 }}>
        {userInfo.userInfo.emailCus}
      </Text>
      <TouchableOpacity
        style={styles.info}
        onPress={() => {
          navigation.navigate("MyAddress");
        }}
      >
        <Text>My Address</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.info}
        onPress={() => {
          navigation.navigate("Order");
        }}
      >
        <Text>My Orders</Text>
      </TouchableOpacity>
      <View style={styles.buttonLogout}>
        <CommonButton
          bgColor={"black"}
          textColor={"#fff"}
          title={"LOGOUT"}
          onPress={() => {
            handleLogout();
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  Profile: {
    width: "100%",
    height: 70,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  profile: {
    fontWeight: "600",
    fontSize: 18,
    marginLeft: 15,
  },
  setting: {
    width: 30,
    height: 30,
    marginRight: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  info: {
    width: "90%",
    height: 70,
    alignSelf: "center",
    justifyContent: "center",
    borderBottomColor: "#8e8e8e",
    borderBottomWidth: 0.3,
  },
  buttonLogout: {
    marginTop: 250,
  },
});
