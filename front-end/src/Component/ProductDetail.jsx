import React, { Component, useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart, addToWishlist } from "../redux/actions/Actions";
import CommonButton from "../Custom/CommonButton";
const ProductDetail = ({
  navigation,
  route,
  onAddToCart,
  addQuantity,
  reduceQuantity,
}) => {
  const item = route.params;
  const data = useSelector((state) => state);
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  return (
    // <View style={styles.containerProductDetail}>
    //   <View style={styles.header}>
    //     <TouchableOpacity
    //       onPress={() => {
    //         navigation.goBack();
    //       }}
    //       style={{
    //         width: 300,
    //       }}
    //     >
    //       <Image
    //         source={require("../../assets/backButton.jpg")}
    //         style={{ width: 30, height: 30 }}
    //       />
    //     </TouchableOpacity>
    //     <TouchableOpacity
    //       style={{
    //         width: 40,
    //         height: 40,
    //         backgroundColor: "#000",
    //         justifyContent: "center",
    //         alignItems: "center",
    //         borderRadius: 25,
    //       }}
    //       onPress={() => {
    //         navigation.navigate("ShoppingCart");
    //       }}
    //     >
    //       <Image
    //         source={require("../../assets/cart.jpg")}
    //         style={{
    //           width: 30,
    //           height: 30,
    //           tintColor: "#fff",
    //         }}
    //       />
    //       <View style={styles.amountItem}>
    //         <Text style={{ color: "#fff", fontWeight: "600" }}>
    //           {data.cartReducer.length}
    //         </Text>
    //       </View>
    //     </TouchableOpacity>
    //   </View>

    //   <View style={styles.descProduct}>
    //     <Image source={{ uri: item.image }} style={styles.imageProductItem} />
    //     <Text style={styles.titleProductItem}>
    //       {item.nameProduct} - ${item.price}
    //     </Text>
    //     <Text style={styles.weightProductItem}>Weight: {item.weight}</Text>
    //     <Text style={styles.desc}>{item.desc}</Text>
    //   </View>
    // </View>
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: "#FFF",
      }}
    >
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
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.image }} style={styles.imageProductItem} />
      </View>
      <View style={styles.descProduct}>
        <View
          style={{
            marginLeft: 20,
            marginTop: 20,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 22, fontWeight: "bold" }}>
            {item.nameProduct}
          </Text>

          <View style={styles.priceTag}>
            <Text
              style={{
                marginLeft: 20,
                color: "#FFF",
                fontWeight: "bold",
                fontSize: 18,
              }}
            >
              ${item.price}
            </Text>
          </View>
        </View>
        <Text style={{ fontSize: 16, fontWeight: "600", marginLeft: 20 }}>
          Weight: {item.weight}
        </Text>
        <Text style={{ fontSize: 16, fontWeight: "600", marginLeft: 20 }}>
          Category: {item.category}
        </Text>
        <View style={{ paddingHorizontal: 20 }}>
          <Text
            style={{
              color: "grey",
              fontSize: 15,
              lineHeight: 22,
              marginTop: 10,
            }}
          >
            {item.desc}
          </Text>
          {/* <View style={styles.containerButton}>
            <CommonButton
              bgColor={"black"}
              textColor={"#fff"}
              title={"ADD TO CART"}
              onPress={() => {
                console.log("add to cart");
              }}
            />
          </View> */}
        </View>
      </View>
    </ScrollView>
  );
};

export default ProductDetail;
const styles = StyleSheet.create({
  containerProductDetail: {
    flex: 1,
  },
  header: {
    width: "100%",
    height: 50,
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  buttonAddToCart: {},
  descProduct: {
    flex: 1,
    backgroundColor: "#F1F1F1",
    marginHorizontal: 7,
    marginBottom: 7,
    borderRadius: 20,
    marginTop: 20,
    height: "100%",
  },
  imageProductItem: {
    width: "100%",
    height: 370,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  titleProductItem: {
    marginLeft: 5,
    marginTop: 15,
    fontSize: 22,
    fontWeight: "600",
    fontWeight: "bold",
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
  priceTag: {
    backgroundColor: "#00B761",
    width: 80,
    height: 40,
    justifyContent: "center",
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
  },
  containerButton: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 20,
    justifyContent: "center",
  },
});
