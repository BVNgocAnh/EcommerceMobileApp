import React, { useState } from "react";
import ProductStatistics from "../Tabs/ProductStatistics";
import UserPanel from "../Tabs/UserStatistics";
import UserStatistics from "../Tabs/UserStatistics";
import AddProduct from "./AddProduct";
import { Header } from "react-native/Libraries/NewAppScreen";
import { TouchableOpacity, View, Image, StyleSheet, Text } from "react-native";
const Dashboard = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  return (
    <View style={{ flex: 1, backgroundColor: "#8e8e8e" }}>
      {selectedTab == 0 ? (
        <ProductStatistics />
      ) : selectedTab == 1 ? (
        <AddProduct />
      ) : selectedTab == 2 ? (
        <UserStatistics />
      ) : selectedTab == 3 ? (
        <UserPanel />
      ) : null}

      <View style={styles.container}>
        <TouchableOpacity
          style={styles.navigation}
          onPress={() => {
            setSelectedTab(0);
          }}
        >
          <Image
            source={require("../../assets/product.jpg")}
            style={{
              width: 30,
              height: 30,
              tintColor: selectedTab == 0 ? "#000" : "#8e8e8e",
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navigation}
          onPress={() => {
            setSelectedTab(1);
          }}
        >
          <Image
            source={require("../../assets/addproduct.png")}
            style={{
              width: 30,
              height: 30,
              tintColor: selectedTab == 1 ? "#000" : "#8e8e8e",
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navigation}
          onPress={() => {
            setSelectedTab(2);
          }}
        >
          <Image
            source={require("../../assets/userlist.jpg")}
            style={{
              width: 30,
              height: 30,
              tintColor: selectedTab == 2 ? "#000" : "#8e8e8e",
            }}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navigation}
          onPress={() => {
            setSelectedTab(3);
          }}
        >
          <Image
            source={require("../../assets/setting.jpg")}
            style={{
              width: 30,
              height: 30,
              tintColor: selectedTab == 3 ? "#000" : "#8e8e8e",
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: 60,
    backgroundColor: "#fff",
    bottom: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
  },
  navigation: {
    width: "20%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    bottom: 0,
  },
});
