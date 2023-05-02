import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import CommonButton from "../Custom/CommonButton";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
const PaymentSuccess = () => {
  const navigation = useNavigation();
  const orderData = useSelector((state) => state.orderRecucer);
  console.log(orderData);
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/success.jpg")}
        style={{
          width: 200,
          height: 200,
        }}
      />
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
