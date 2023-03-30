import React, { useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "../Component/CartItem";
import CommonButton from "../Custom/CommonButton";
import { addToWishlist, removeFromCart } from "../redux/actions/Actions";
export default function Cart() {
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
          <Text>No Items Added in Cart</Text>
        </View>
      )}
      {/* {cartData.length > 0 ? (
        <View style={{ marginBottom: 80 }}>
          <CommonButton
            bgColor={"black"}
            textColor={"#fff"}
            title={"CHECKOUT NOW"}
            onPress={() => {
              console.log("Checkout");
            }}
          />
        </View>
      ) : null} */}
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
