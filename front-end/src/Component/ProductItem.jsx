import React from "react";
import { Text, View, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Dimensions } from "react-native";
const width = Dimensions.get("window").width / 2 - 30;
const ProductItem = ({ item, onAddToCart, onAddToWishlist }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => {
        navigation.navigate("ProductDetail", item);
      }}
    >
      <View style={styles.containerProductItem}>
        <View>
          <View
            style={{
              height: 150,
              alignItems: "center",
            }}
          >
            <Image
              source={{ uri: item.image }}
              style={styles.imageProductItem}
            />
          </View>
          <View style={styles.titleProductItem}>
            <Text style={{ fontSize: 15, fontWeight: "600" }}>
              {item.nameProduct}
            </Text>
          </View>
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
              <View
                style={{
                  height: 25,
                  width: 25,
                  borderRadius: 5,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  source={require("../../assets/addToCart.jpg")}
                  style={{
                    width: 25,
                    height: 25,
                  }}
                />
              </View>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.buttonAddToWishlist}
            onPress={() => {
              onAddToWishlist(item);
            }}
          >
            <Image
              source={require("../../assets/newheart.jpg")}
              style={{
                width: 25,
                height: 25,
                borderRadius: 20,
                justifyContent: "center",
                alignItems: "center",
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};
export default ProductItem;

const styles = StyleSheet.create({
  containerProductItem: {
    // width: 200,
    // height: 260,
    // borderWidth: 1,
    // borderRadius: 0,
    // marginLeft: 20,
    // borderRadius: 10,
    // backgroundColor: "#FFF ",
    // marginBottom: 15,
    // marginTop: 10,
    height: 300,
    backgroundColor: "#F1F1F1",
    width,
    marginHorizontal: 2,
    borderRadius: 10,
    marginBottom: 20,
    marginLeft: 20,
    padding: 15,
  },
  imageProductItem: {
    flex: 1,
    width: "100%",
    height: "50%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: "#FFF",
  },
  titleProductItem: {
    height: 20,
    marginLeft: 10,
    marginTop: 15,
    fontWeight: "600",
  },
  buttonAddToCart: {
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
    borderWidth: 1,
  },
  descProductItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 5,
    alignItems: "center",
  },
});
