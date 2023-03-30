import React from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";

const Header = () => {
  return (
    <View
      style={{
        width: "100%",
        height: 90,
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        backgroundColor: "#fff",
        borderBottomColor: "#8e8e8e",
        borderBottomWidth: 0.2,
      }}
    >
      <Text
        style={{
          marginTop: 40,
          marginLeft: 10,
          fontWeight: "600",
          fontSize: 20,
          color: "000",
        }}
      >
        CAVA Specialty Coffee
      </Text>
      <TouchableOpacity
        style={{
          // marginRight: 20,
          justifyContent: "center",
          width: 50,
          height: 30,
          marginTop: 40,
        }}
      >
        <Image
          source={require("../../assets/notification-bell.jpg")}
          style={{ width: 30, height: 30, tintColor: "#000" }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Header;
