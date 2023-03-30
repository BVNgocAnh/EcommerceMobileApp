import { useState } from "react";
import { TouchableOpacity, View, Image, StyleSheet, Text } from "react-native";
import Cart from "../NavigationComponent/Cart";
import Main from "../NavigationComponent/Main";
import Profile from "../NavigationComponent/Profile";
import Search from "../NavigationComponent/Search";
import Wishlist from "../NavigationComponent/Wishlist";
import { useSelector } from "react-redux";
export default function HomeScreen() {
  const [selectedTab, setSelectedTab] = useState(0);
  const data = useSelector((state) => state);
  return (
    <View style={{ flex: 1 }}>
      {/* {selectedTab == 0 ? (
        <Main />
      ) : selectedTab == 1 ? (
        <Search />
      ) : selectedTab == 2 ? (
        <Cart />
      ) : selectedTab == 3 ? (
        <Wishlist />
      ) : (
        <Profile />
      )} */}
      {selectedTab == 0 ? (
        <Main />
      ) : selectedTab == 1 ? (
        <Cart />
      ) : selectedTab == 2 ? (
        <Wishlist />
      ) : (
        <Profile />
      )}
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.navigation}
          onPress={() => {
            setSelectedTab(0);
          }}
        >
          <Image
            source={require("../../assets/home.jpg")}
            style={{
              width: 30,
              height: 30,
              tintColor: selectedTab == 0 ? "#000" : "#8e8e8e",
            }}
          />
        </TouchableOpacity>
        <View
          style={{
            width: "20%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            style={{
              width: 45,
              height: 45,
              borderRadius: 22,
              backgroundColor: selectedTab == 1 ? "#003366" : "#000",
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => {
              setSelectedTab(1);
            }}
          >
            <Image
              source={require("../../assets/cart.jpg")}
              style={{ width: 30, height: 30, tintColor: "#FFF" }}
            />
            <View style={styles.amountItem}>
              <Text style={{ color: "#fff", fontWeight: "600" }}>
                {data.cartReducer.length}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.navigation}
          onPress={() => {
            setSelectedTab(2);
          }}
        >
          <Image
            source={require("../../assets/heart.jpg")}
            style={{
              width: 30,
              height: 30,
              tintColor: selectedTab == 2 ? "#000" : "#8e8e8e",
            }}
          />
          <View style={styles.amountWishlist}>
            <Text style={{ color: "#fff", fontWeight: "600" }}>
              {data.wishlistReducer.length}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navigation}
          onPress={() => {
            setSelectedTab(3);
          }}
        >
          <Image
            source={require("../../assets/user.jpg")}
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
}

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
  amountItem: {
    backgroundColor: "red",
    position: "absolute",
    width: 20,
    height: 20,
    alignItems: "center",
    borderRadius: 20,
    justifyContent: "center",
    top: 3,
    right: 5,
  },
  amountWishlist: {
    backgroundColor: "red",
    position: "absolute",
    width: 20,
    height: 20,
    alignItems: "center",
    borderRadius: 10,
    justifyContent: "center",
    top: 10,
    right: 20,
  },
});
