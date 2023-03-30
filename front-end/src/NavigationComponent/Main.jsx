import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Header from "../Custom/Header";
import ProductItem from "../Component/ProductItem";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart, addToWishlist } from "../redux/actions/Actions";
import useFetch from "../Hooks/useEffect";
const Main = () => {
  const { data, loading, error } = useFetch("server/products");

  const dispatch = useDispatch();
  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={{ flex: 1 }}>
        <Header />
        <Image
          style={styles.banner}
          source={require("../../assets/banner.jpg")}
        />
        <Text style={styles.AllProduct}>ALL PRODUCTS</Text>
        <Text style={styles.categoryTitle}>ARABICA</Text>
        <View style={{ marginTop: 15 }}>
          <FlatList
            data={data}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => {
              return (
                <ProductItem
                  item={item}
                  onAddToCart={(x) => {
                    dispatch(addItemToCart(item));
                  }}
                  onAddToWishlist={(x) => {
                    dispatch(addToWishlist(item));
                  }}
                />
              );
            }}
          />
        </View>
        <Text style={styles.categoryTitle}>ROBUSTA</Text>
        <View style={{ marginTop: 15 }}>
          <FlatList
            data={data}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => {
              return (
                <ProductItem
                  item={item}
                  onAddToCart={(x) => {
                    dispatch(addItemToCart(item));
                  }}
                  onAddToWishlist={(x) => {
                    dispatch(addToWishlist(item));
                  }}
                />
              );
            }}
          />
        </View>
      </View>
    </ScrollView>
  );
};
export default Main;
const styles = StyleSheet.create({
  banner: {
    height: 200,
    width: "94%",
    borderRadius: 10,
    alignSelf: "center",
    marginTop: 10,
  },
  AllProduct: {
    marginTop: 20,
    marginLeft: 20,
    color: "#000",
    fontSize: 20,
    fontWeight: "600",
    alignSelf: "center",
  },
  categoryTitle: {
    marginLeft: 20,
    color: "#000",
    fontSize: 20,
    fontWeight: "600",
  },
});
