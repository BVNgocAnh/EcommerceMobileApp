import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import CommonButton from "../Custom/CommonButton";
import { useNavigation } from "@react-navigation/native";
const PaymentSuccess = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text>Ordered successfully</Text>
      <CommonButton
        bgColor={"black"}
        textColor={"#fff"}
        title={"BACK TO HOMEPAGE"}
        onPress={() => {
          navigation.navigate("HomeScreen");
        }}
      />
    </View>
  );
};
export default PaymentSuccess;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
