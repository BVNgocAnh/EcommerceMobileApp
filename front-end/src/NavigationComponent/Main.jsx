import React, { useContext, useEffect, useRef, useState, useMemo } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Alert,
  Modal,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart, addToWishlist } from "../redux/actions/Actions";
import Icon from "react-native-vector-icons/MaterialIcons";
import { TextInput } from "react-native-gesture-handler";
import CategoryList from "../Component/CategoryList";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { AuthContext } from "../context/authContext";
import { productAPI } from "../config";
import { Dimensions } from "react-native";
const width = Dimensions.get("window").width / 2 - 30;

const ProductTemp = ({ item, onAddToCart, onAddToWishlist }) => {
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

const Main = () => {
  const dispatch = useDispatch();
  const userInfo = useContext(AuthContext);
  const [filterData, setFilterData] = useState([]);
  const [masterData, setMasterData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [product, setProduct] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [categoryIndex, setCategoryIndex] = useState(0);
  const [filteredCategory, setFilteredCategory] = useState([]);
  const categories = ["arabica", "robusta"];
  const [sortAscending, setSortAscending] = useState(true);
  const [sortedData, setSortedData] = useState([]);

  useEffect(() => {
    const productsAPI = `${productAPI}`;
    console.log(productAPI);
    axios
      .get(productsAPI)
      .then((responseJson) => {
        setFilterData(responseJson.data);
        setMasterData(responseJson.data);
        setProduct(responseJson.data);
        const filtered = responseJson.data.filter((item) =>
          item.category.includes(categories[categoryIndex])
        );
        setFilteredCategory(filtered);
        setSortedData(responseJson.data);
      })
      .catch((error) => console.log(error));
  }, [categoryIndex, sortAscending]);

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
  const handleVisibleModal = () => {
    setModalVisible(!modalVisible);
  };

  const handleSortPress = () => {
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFF" }}>
      <View style={{ flex: 1 }}>
        <View style={styles.header}>
          <View>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              Welcome {userInfo.userInfo.username} to
            </Text>
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
            <TouchableOpacity
              onPress={() => {
                // Confirm();
                handleVisibleModal();
              }}
            >
              <Icon name="sort" size={30} color="#FFF" />
            </TouchableOpacity>
          </View>
          <Modal animationType="fade" transparent={true} visible={modalVisible}>
            <View style={styles.modalContainer}>
              <View style={styles.modal}>
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={() => handleSortPress()}
                >
                  <Text style={styles.modalButtonText}>
                    Sort by Price (Low to High)
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={() => handleSortPress()}
                >
                  <Text style={styles.modalButtonText}>
                    Sort by Price (High to Low)
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.modalButton, styles.cancelButton]}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.modalButtonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
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
        <View style={{ marginTop: 15 }}>
          {filterData.length > 0 ? (
            <FlatList
              data={
                filteredCategory.length > 0
                  ? filteredCategory.filter((item) =>
                      item.nameProduct
                        .toLowerCase()
                        .includes(searchText.toLowerCase())
                    )
                  : filterData.filter((item) =>
                      item.nameProduct
                        .toLowerCase()
                        .includes(searchText.toLowerCase())
                    )
              }
              keyExtractor={(item, index) => index.toString()}
              horizontal={false}
              showsHorizontalScrollIndicator={false}
              numColumns={2}
              renderItem={({ item, index }) => {
                return (
                  <ProductTemp
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
          ) : (
            <View>
              <Text style={{ alignSelf: "center" }}>
                The product not exist.
              </Text>
            </View>
          )}
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
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modal: {
    backgroundColor: "#fff",
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
    width: 300,
    alignItems: "center",
  },
  modalButton: {
    paddingVertical: 10,
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    alignItems: "center",
  },
  modalButtonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  cancelButton: {
    borderBottomWidth: 0,
    marginTop: 10,
  },
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

  //-------------------------------
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
