import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function Profile() {
  const navigation = useNavigation();
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
        DORAEMON
      </Text>
      <TouchableOpacity
        style={styles.info}
        onPress={() => {
          navigation.navigate("MyAddress");
        }}
      >
        <Text>My Address</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.info}>
        <Text>My Orders</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.info}>
        <Text>Offers</Text>
      </TouchableOpacity>
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
});
