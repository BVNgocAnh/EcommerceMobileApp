import React from "react";
import { Text, View, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
const CartItem = ({
  item,
  onRemoveItem,
  onRemoveFromWishlist,
  onAddToCart,
  onAddToWishlist,
  isWishlist,
}) => {
  const navigation = useNavigation();
  return (
    // const handleQuantity = (type) => {
    //   if (type === "dec") {
    //     quantity > 1 && setQuantity(quantity - 1);
    //   } else {
    //     setQuantity(quantity + 1);
    //   }
    // }
    <View style={{ flex: 1 }}>
      <TouchableOpacity
        style={styles.containerCartItem}
        onPress={() => {
          navigation.navigate("ProductDetail", item);
        }}
      >
        <Image source={{ uri: item.image }} style={styles.imageCartItem} />
        <Text style={styles.titleCartItem}>{item.nameProduct}</Text>
        <View style={styles.descCartItem}>
          <Text style={{ fontSize: 20, fontWeight: "600" }}>
            {"$" + item.price}
          </Text>

          {isWishlist ? (
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
          ) : (
            <TouchableOpacity
              style={styles.buttonRemoveItem}
              onPress={() => {
                onRemoveItem(item);
              }}
            >
              <Image
                source={require("../../assets/trash.jpg")}
                style={{
                  width: 30,
                  height: 30,
                }}
              />
            </TouchableOpacity>
          )}
        </View>
        {isWishlist ? (
          <TouchableOpacity
            style={styles.buttonRemoveWishlist}
            onPress={() => {
              onRemoveFromWishlist();
            }}
          >
            <Image
              source={require("../../assets/heart_fill.jpg")}
              style={{
                width: 24,
                height: 24,
                tintColor: "red",
              }}
            />
          </TouchableOpacity>
        ) : (
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
        )}
      </TouchableOpacity>
    </View>
  );
};

export default CartItem;

const styles = StyleSheet.create({
  containerCartItem: {
    width: "94%",
    height: 200,
    borderWidth: 1,
    marginLeft: 15,
    borderRadius: 10,
    backgroundColor: "#FFF ",
    marginBottom: 15,
    marginTop: 20,
  },
  imageCartItem: {
    width: "100%",
    height: 100,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  titleCartItem: {
    marginLeft: 10,
    marginTop: 15,
    fontSize: 15,
    fontWeight: "600",
  },
  descCartItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 0,
    alignItems: "center",
  },
  buttonAddToCart: {
    // borderWidth: 1,
    // borderRadius: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 5,
    paddingTop: 10,
  },
  buttonRemoveItem: {
    // borderWidth: 1,
    // borderRadius: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 5,
    paddingTop: 10,
  },
  buttonRemoveWishlist: {
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
});
