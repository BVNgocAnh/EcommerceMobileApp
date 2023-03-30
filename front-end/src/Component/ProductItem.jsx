import React from "react";
import { Text, View, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const ProductItem = ({ item, onAddToCart, onAddToWishlist }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.containerProductItem}
      onPress={() => {
        navigation.navigate("ProductDetail", item);
      }}
    >
      <Image source={{ uri: item.image }} style={styles.imageProductItem} />
      <Text numberOfLines={1} style={styles.titleProductItem}>
        {item.nameProduct}
      </Text>
      <View style={styles.descProductItem}>
        <Text style={{ fontSize: 20, fontWeight: "600" }}>
          {"$" + item.price}
        </Text>
        <TouchableOpacity
          style={styles.buttonAddToCart}
          onPress={() => {
            onAddToCart(item);
          }}
        >
          <Image
            source={require("../../assets/addToCart.jpg")}
            style={{
              width: 30,
              height: 30,
            }}
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.buttonAddToWishlist}
        onPress={() => {
          onAddToWishlist(item);
        }}
      >
        <Image
          source={require("../../assets/heart.jpg")}
          style={{
            width: 24,
            height: 24,
          }}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};
export default ProductItem;

const styles = StyleSheet.create({
  containerProductItem: {
    width: 200,
    height: 260,
    borderWidth: 1,
    borderRadius: 0,
    marginLeft: 20,
    borderRadius: 10,
    backgroundColor: "#FFF ",
    marginBottom: 15,
    marginTop: 10,
  },
  imageProductItem: {
    width: "100%",
    height: "50%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  titleProductItem: {
    marginLeft: 10,
    marginTop: 15,
    fontSize: 15,
    fontWeight: "600",
  },
  buttonAddToCart: {
    // borderWidth: 1,
    // borderRadius: 15,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingTop: 10,
  },
  buttonAddToWishlist: {
    width: 40,
    height: 40,
    backgroundColor: "#fff",
    top: 10,
    right: 10,
    position: "absolute",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  descProductItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 10,
    alignItems: "center",
  },
});
