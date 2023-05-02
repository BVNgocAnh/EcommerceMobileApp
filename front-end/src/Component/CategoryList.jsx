import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from "react-native";
import { productAPI } from "../config";
import axios from "axios";
import { Dimensions } from "react-native";
import { FlatList } from "react-native-gesture-handler";
const width = Dimensions.get("window").width / 2 - 30;
const CategoryList = ({ item, onAddToCart, onAddToWishlist }) => {
  const [categoryIndex, setCategoryIndex] = useState(0);
  const [filteredCategory, setFilteredCategory] = useState([]);
  const categories = ["arabica", "robusta"];
  const [product, setProduct] = useState([]);
  useEffect(() => {
    const productsAPI = `${productAPI}`;
    axios
      .get(productsAPI)
      .then((responseJson) => {
        setProduct(responseJson.data);
        const filtered = responseJson.data.filter((item) =>
          item.category.includes(categories[categoryIndex])
        );
        setFilteredCategory(filtered);
      })
      .catch((error) => console.log(error));
  }, [categoryIndex]);

  return (
    <SafeAreaView>
      <View style={styles.categoryContainer}>
        {categories.map((item, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.8}
            onPress={() => setCategoryIndex(index)}
          >
            <Text
              style={[
                styles.categoryText,
                categoryIndex === index && styles.categoryTextSelected,
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View>
        <FlatList
          data={filteredCategory}
          numColumns={2}
          renderItem={({ item, index }) => {
            return (
              <View style={styles.containerProductItem}>
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
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default CategoryList;
const styles = StyleSheet.create({
  categoryContainer: {
    flexDirection: "row",
    marginTop: 30,
    marginBottom: 20,
    justifyContent: "space-evenly",
  },
  categoryText: {
    fontSize: 16,
    color: "grey",
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  categoryTextSelected: {
    color: "#00B761",
    paddingBottom: 5,
    borderBottomWidth: 2,
    borderColor: "#00B761",
  },
  containerProductItem: {
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
