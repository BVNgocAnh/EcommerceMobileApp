import React, { useEffect } from "react";
import { View, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Splash() {
  const navigation = useNavigation();
  useEffect(() => {
    setTimeout(() => {
      getData();
    }, 2000);
  }, []);

  const getData = async () => {
    const username = await AsyncStorage.getItem("USERNAME");
    if (username !== null) {
      navigation.navigate("HomeScreen");
    } else {
      navigation.navigate("Login");
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFF",
      }}
    >
      <Image
        source={require("../../assets/logo.png")}
        style={{
          width: 200,
          height: 200,
        }}
      />
    </View>
  );
}
