import React, { useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "../Component/CartItem";
import CommonButton from "../Custom/CommonButton";
import { addToWishlist, removeFromCart } from "../redux/actions/Actions";
import { useNavigation } from "@react-navigation/native";

export default function Cart() {
  const navigation = useNavigation();
  const [cartList, setCartList] = useState([]);
  const cartData = useSelector((state) => state.cartReducer);
  const dispatch = useDispatch();
  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.titleCart}>SHOPPING CART</Text>
      {cartData.length > 0 ? (
        <FlatList
          data={cartData}
          renderItem={({ item, index }) => {
            return (
              <CartItem
                item={item}
                onAddToWishlist={(x) => {
                  dispatch(addToWishlist(x));
                }}
                onRemoveItem={() => {
                  dispatch(removeFromCart(index));
                }}
              />
            );
          }}
        />
      ) : (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={{ fontSize: 20 }}>NO ITEM IN YOUR SHOPPING CART</Text>
        </View>
      )}
      {cartData.length > 0 ? (
        <View style={{ marginBottom: 80 }}>
          <CommonButton
            bgColor={"black"}
            textColor={"#fff"}
            title={"GO TO CHECKOUT"}
            onPress={() => {
              navigation.navigate("Checkout");
            }}
          />
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  titleCart: {
    marginTop: 45,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    fontWeight: "600",
    fontSize: 22,
  },
});
