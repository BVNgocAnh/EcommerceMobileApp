import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
const ItemCheckout = ({ data, onCheckItem, addQuantity, reduceQuantity }) => {
  const cartData = useSelector((state) => state.cartReducer);
  const { image, nameProduct, category, price, selected, quantity } =
    data || {};
  return (
    <View style={styles.container}>
      <View style={styles.wrapperImageCheck}>
        <TouchableOpacity style={styles.button} onPress={onCheckItem}>
          <Text style={styles.iconPlus}>{selected ? "V" : ""}</Text>
        </TouchableOpacity>
        <Image source={{ uri: image }} style={styles.productImage} />
      </View>
      <View>
        <View>
          <Text style={{ fontSize: 17, fontWeight: "500" }}>{nameProduct}</Text>
          <Text
            style={{
              marginTop: 5,
              fontSize: 16,
              fontWeight: "450",
              textTransform: "capitalize",
            }}
          >
            {category}
          </Text>
          <Text
            style={{
              marginTop: 5,
              fontSize: 17,
              fontWeight: "600",
            }}
          >
            $ {price}
          </Text>
        </View>
        <View style={styles.containerButton}>
          <TouchableOpacity
            style={styles.buttonQuantity}
            onPress={reduceQuantity}
          >
            <Text style={{ color: "#FFF" }}>-</Text>
          </TouchableOpacity>
          <Text style={{ marginLeft: 10 }}>{quantity}</Text>
          <TouchableOpacity style={styles.buttonQuantity} onPress={addQuantity}>
            <Text style={{ color: "#FFF" }}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
export default ItemCheckout;

const styles = StyleSheet.create({
  titleCart: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    fontWeight: "600",
    fontSize: 22,
    marginBottom: 20,
  },
  containerButton: {
    flexDirection: "row",
    paddingLeft: 170,
  },
  buttonQuantity: {
    backgroundColor: "black",
    borderRadius: 7,
    height: 25,
    width: 25,
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 5,
    paddingRight: 5,
    marginLeft: 10,
  },
  container: {
    flexDirection: "row",
    marginBottom: 20,
    height: 110,
    backgroundColor: "#FFF",
    borderRadius: 12,
  },
  wrapperImageCheck: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 7,
  },
  productImage: {
    width: 80,
    height: 80,
    marginHorizontal: 10,
  },
  button: {
    backgroundColor: "black",
    borderRadius: 7,
    height: 27,
    width: 27,
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 5,
    paddingRight: 5,
    marginLeft: 10,
  },
  iconPlus: {
    color: "green",
    fontWeight: "600",
  },

  footer: {
    borderTopWidth: 0.5,
    paddingLeft: 15,
    borderColor: "grey",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 70,
  },
  textFooter: {
    fontSize: 20,
    fontWeight: "600",
  },
  buttonCheckout: {
    backgroundColor: "orange",
    paddingHorizontal: 30,
    paddingVertical: 15,
    height: 50,
    marginRight: 10,
  },
  button: {
    borderWidth: 0.5,
    borderRadius: 4,
    width: 25,
    height: 25,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },

  iconPlus: {
    color: "green",
    fontWeight: "600",
  },
});
