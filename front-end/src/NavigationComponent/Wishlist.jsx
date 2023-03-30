import React, { useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "../Component/CartItem";
import {
  addItemToCart,
  removeFromCart,
  removeFromWishlist,
} from "../redux/actions/Actions";
export default function Wishlist() {
  // const [heartList, setHeartList] = useState([]);
  const heartData = useSelector((state) => state.wishlistReducer);
  const dispatch = useDispatch();
  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.titleWishlist}>MY WISHLIST</Text>
      <FlatList
        data={heartData}
        renderItem={({ item, index }) => {
          return (
            <CartItem
              isWishlist={"swe"}
              item={item}
              onRemoveFromWishlist={() => {
                dispatch(removeFromWishlist(index));
              }}
              onAddToCart={(x) => {
                dispatch(addItemToCart(x));
              }}
            />
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  titleWishlist: {
    marginTop: 45,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    fontWeight: "600",
    fontSize: 22,
  },
});
