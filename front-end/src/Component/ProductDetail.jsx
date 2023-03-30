import React, { Component, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart, addToWishlist } from "../redux/actions/Actions";
import CommonButton from "../Custom/CommonButton";
const ProductDetail = ({ navigation, route, onAddToCart }) => {
  const item = route.params;
  const data = useSelector((state) => state);
  const dispatch = useDispatch();
  return (
    <View style={styles.containerProductDetail}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={{
            width: 300,
          }}
        >
          <Image
            source={require("../../assets/backButton.jpg")}
            style={{ width: 30, height: 30 }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: 40,
            height: 40,
            backgroundColor: "#000",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 25,
          }}
          onPress={() => {
            navigation.navigate("ShoppingCart");
          }}
        >
          <Image
            source={require("../../assets/cart.jpg")}
            style={{
              width: 30,
              height: 30,
              tintColor: "#fff",
            }}
          />
          <View style={styles.amountItem}>
            <Text style={{ color: "#fff", fontWeight: "600" }}>
              {data.cartReducer.length}
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.descProduct}>
        <Image source={{ uri: item.image }} style={styles.imageProductItem} />
        <Text style={styles.titleProductItem}>
          {item.nameProduct} - ${item.price}
        </Text>
        <Text style={styles.weightProductItem}>Weight: {item.weight}</Text>
        <Text style={styles.desc}>{item.desc}</Text>
        {/* <CommonButton
          title={"ADD TO CART"}
          bgColor={"#000"}
          textColor={"#fff"}
          onPress={() => {
            // onAddToWishlist(item);
          }}
          // onAddToCart={(x) => {
          //   dispatch(addItemToCart(item));
          // }}
        /> */}
        <CommonButton
          title={"ADD TO CART"}
          bgColor={"#000"}
          textColor={"#fff"}
          item={item}
          onPress={() => {
            onAddToCart = (x) => {
              dispatch(addItemToCart(item));
            };
            console.log("add to cart");
          }}
        />
      </View>
    </View>
  );
};

export default ProductDetail;
const styles = StyleSheet.create({
  containerProductDetail: {
    flex: 1,
  },
  header: {
    width: "100%",
    height: 70,
    marginTop: 20,
    // marginLeft: 20
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  buttonAddToCart: {},
  descProduct: { flex: 1, backgroundColor: "#fff" },
  imageProductItem: {
    width: "100%",
    height: "45%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  titleProductItem: {
    marginLeft: 5,
    marginTop: 15,
    fontSize: 22,
    fontWeight: "600",
  },
  weightProductItem: {
    marginLeft: 5,
    fontSize: 17,
    fontWeight: "700",
  },
  desc: {
    marginLeft: 5,
    fontSize: 15,
  },
  button: {},
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
});
