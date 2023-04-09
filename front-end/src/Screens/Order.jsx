import React, { useState } from "react";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import CommonButton from "../Custom/CommonButton";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { FlatList } from "react-native-gesture-handler";
const Order = () => {
  const navigation = useNavigation();
  const orderData = useSelector((state) => state.orderRecucer);
  return (
    <View style={styles.container}>
      <Text>Ordered Page</Text>
    </View>
  );
};
export default Order;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
