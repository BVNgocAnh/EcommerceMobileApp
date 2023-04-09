import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart, addToWishlist } from "../redux/actions/Actions";
import useFetch from "../Hooks/useEffect";
import Icon from "react-native-vector-icons/MaterialIcons";
import { TextInput } from "react-native-gesture-handler";
import CategoryList from "../Component/CategoryList";
import { Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ProductItem from "../Component/ProductItem";
import axios from "axios";
const width = Dimensions.get("window").width / 2 - 30;
const URL = "http://192.168.1.119:3000/server/products/";
const Main = () => {
  // const { data, loading, error } = useFetch("server/products");
  const [selectedCategory, setSelectedCategory] = useState(null);
  // const [visible, setVisible] = useState(false);
  const [filterData, setFilterData] = useState([]);
  const [masterData, setMasterData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const navigation = useNavigation();
  const dispatch = useDispatch();
  useEffect(() => {
    axios
      .get(URL)
      .then((responseJson) => {
        setFilterData(responseJson.data);
        setMasterData(responseJson.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const onSearching = (text) => {
    if (text) {
      const newData = masterData.filter((item) => {
        const itemData = item.nameProduct
          ? item.nameProduct.toUpperCase()
          : "".toUpperCase();

        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilterData(newData);
      setSearchText(text);
    } else {
      setFilterData(masterData);
      setSearchText(text);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFF" }}>
      <View style={{ flex: 1 }}>
        <View style={styles.header}>
          <View>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>Welcome to</Text>
            <Text
              style={{ fontSize: 30, color: "#00B761", fontWeight: "bold" }}
            >
              CAVA Specialty Coffee
            </Text>
          </View>
        </View>
        <View style={{ marginTop: 30, flexDirection: "row" }}>
          <View style={styles.searchContainer}>
            <Icon name="search" size={25} style={{ marginLeft: 20 }} />
            <TextInput
              placeholder="Search"
              style={styles.input}
              value={searchText}
              onChangeText={(txt) => {
                onSearching(txt);
              }}
            />
          </View>
          <View style={styles.sortBtn}>
            <TouchableOpacity>
              <Icon name="sort" size={30} color="#FFF" />
            </TouchableOpacity>
          </View>
        </View>
        <CategoryList />
        <View style={{ marginTop: 15 }}>
          <FlatList
            data={filterData}
            horizontal={false}
            showsHorizontalScrollIndicator={false}
            numColumns={2}
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
        <View>
          {/* <Text style={styles.categoryTitle}>ROBUSTA</Text>
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
        </View> */}
        </View>
      </View>
    </SafeAreaView>
  );
};
export default Main;
const styles = StyleSheet.create({
  header: {
    marginTop: 40,
    marginLeft: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  searchContainer: {
    height: 50,
    backgroundColor: "#F1F1F1",
    borderRadius: 10,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
  },
  input: {
    fontSize: 18,
    fontWeight: "bold",
    flex: 1,
    color: "#000",
  },
  sortBtn: {
    marginLeft: 10,
    height: 50,
    width: 50,
    borderRadius: 10,
    backgroundColor: "#00B761",
    justifyContent: "center",
    alignItems: "center",
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
  card: {
    height: 225,
    backgroundColor: "#F1F1F1",
    width,
    marginHorizontal: 2,
    borderRadius: 10,
    marginBottom: 20,
    padding: 15,
  },
});
