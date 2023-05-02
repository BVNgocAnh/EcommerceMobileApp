import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  TextInput,
  Dimensions,
  Button,
  Alert,
  Modal,
} from "react-native";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";
import Icon from "react-native-vector-icons/MaterialIcons";
import axios from "axios";
import useFetch from "../Hooks/useEffect";
import { productAPI } from "../config";
import Dialog from "react-native-dialog";
import * as ImagePicker from "expo-image-picker";
const width = Dimensions.get("window").width / 2 - 30;

const ProductStatistics = () => {
  const navigation = useNavigation();
  const { data, loading, error } = useFetch("server/products/:id");
  const [list, setList] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [masterData, setMasterData] = useState([]);
  const [searchText, setSearchText] = useState("");

  const [nameProduct, setNameProduct] = useState("");
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState(null);
  const [price, setPrice] = useState("");
  const [weight, setWeight] = useState("");
  const [category, setCategory] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [visible, setVisible] = useState(false);
  const [idEdit, setIdEdit] = useState("");
  useEffect(() => {
    axios
      .get(productAPI)
      .then((responseJson) => {
        setFilterData(responseJson.data);
        setMasterData(responseJson.data);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    getList();
  }, []);

  const getList = () => {
    fetch(productAPI, {
      method: "GET",
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        res.list;
      });
  };

  const deleteProduct = (id) => {
    const deleteAPI = `${productAPI}${id}`;
    fetch(deleteAPI, {
      method: "DELETE",
    })
      .then((res) => {
        console.log(res.status);
        return res.json();
      })
      .then(
        (result) => {
          navigation.navigate("Dashboard");
          console.log(result);
        },
        (error) => {
          console.log(error);
        }
      );
  };

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
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setImageUrl(result.assets[0].uri);
    }
  };
  const deleteConfirm = (id) =>
    Alert.alert(
      "Warning",
      "Do you want to delete this product? You cannot undo this action.",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: () => deleteProduct(id) },
      ]
    );

  const handleVisibleModal = () => {
    setVisible(!visible);
  };

  const handleSave = (id) => {
    const updateAPI = `${productAPI}${id}`;
    if (!nameProduct || !desc || !price) {
      console.log("Please fill in all required fields");
      return;
    }
    fetch(updateAPI, {
      method: "PUT",
      body: JSON.stringify({
        nameProduct: nameProduct,
        desc: desc,
        price: price,
        weight: weight,
        image: imageUrl,
        category: category,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        console.log(res.status);
        return res.json();
      })
      .then(
        (result) => {
          navigation.navigate("Dashboard");
          setNameProduct("");
          setDesc("");
          setPrice("");
          setWeight("");
          setCategory("");
          setImageUrl("");
          setImage("");
          setVisible(false);

          console.log(result);
        },
        (error) => {
          console.log(error);
        }
      );
  };

  const handleEdit = (item) => {
    setVisible(true);
    setNameProduct(item.nameProduct);
    setDesc(item.desc);
    setPrice(item.price);
    setWeight(item.weight);
    setCategory(item.category);
    setImageUrl(item.imageUrl);
    setImage(item.image);
    setIdEdit(item._id);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFF" }}>
      <View>
        <View style={styles.header}>
          <View>
            <Text style={{ fontSize: 25, fontWeight: "bold" }}>
              PRODUCT STATISTICS
            </Text>
            <Text
              style={{ fontSize: 30, color: "#00B761", fontWeight: "bold" }}
            >
              CAVA Specialty Coffee
            </Text>
          </View>
        </View>
        {/* MODAL EDIT PRODUCT SAME CREATE  */}
        <Modal visible={visible}>
          <SafeAreaView>
            <View>
              <View style={styles.headerModal}>
                <Text style={{ fontSize: 25, fontWeight: "bold" }}>
                  EDIT PRODUCT
                </Text>
                <TouchableOpacity onPress={handleVisibleModal}>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: "bold",
                      marginRight: 10,
                      marginTop: 5,
                    }}
                  >
                    Close
                  </Text>
                </TouchableOpacity>
              </View>
              <ScrollView>
                <View style={{ marginTop: 20, paddingHorizontal: 10 }}>
                  <Text>Name of Product</Text>
                  <TextInput
                    placeholder="Enter name of product"
                    style={styles.inputStyle}
                    value={nameProduct}
                    onChangeText={(text) => setNameProduct(text)}
                  />
                  <Text>Category</Text>
                  <TextInput
                    placeholder="Enter category"
                    style={styles.inputStyle}
                    value={category}
                    onChangeText={(text) => setCategory(text)}
                  />
                  <Text>Price</Text>
                  <TextInput
                    placeholder="Enter price"
                    style={styles.inputStyle}
                    value={price}
                    onChangeText={(text) => setPrice(text)}
                  />
                  <Text>Description</Text>
                  <TextInput
                    placeholder="Enter product description"
                    style={styles.inputStyle}
                    value={desc}
                    onChangeText={(text) => setDesc(text)}
                  />
                  <Text>Weight</Text>
                  <TextInput
                    placeholder="Enter weight"
                    style={styles.inputStyle}
                    value={weight}
                    onChangeText={(text) => setWeight(text)}
                  />
                  <Text>Image</Text>
                  <TextInput
                    placeholder="Enter Item Image URL"
                    style={styles.inputStyle}
                    value={imageUrl}
                    onChangeText={(text) => setImageUrl(text)}
                  />

                  <Text style={{ alignSelf: "center", marginTop: 10 }}>OR</Text>
                  <TouchableOpacity
                    style={styles.pickBtn}
                    // console.log("pick image");
                    onPress={() => {
                      pickImage();
                    }}
                  >
                    <Text>Pick Image From Gallery</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.uploadBtn}
                    onPress={() => {
                      handleSave(idEdit);
                    }}
                  >
                    <Text style={{ color: "#Fff" }}>Save</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </View>
          </SafeAreaView>
        </Modal>
        <View style={styles.recentProduct}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            Recent Product
          </Text>
        </View>
        {/* SeacrhBar */}
        <>
          <View style={{ marginTop: 5, flexDirection: "row" }}>
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
        </>
        <View style={styles.listProduct}>
          {filterData.length > 0 ? (
            <FlatList
              data={filterData}
              renderItem={({ item, index }) => {
                return (
                  <View style={styles.itemView}>
                    <Image
                      source={{ uri: item.image }}
                      style={styles.imageView}
                    />
                    <View style={styles.infoView}>
                      <Text style={styles.nameText}>{item.nameProduct}</Text>
                      <Text style={styles.priceView}>
                        Category: {item.category}
                      </Text>
                      <Text style={styles.priceView}>Price: ${item.price}</Text>
                      <Text style={{ fontSize: 15 }}>
                        Weight: {item.weight}
                      </Text>
                    </View>
                    <View style={{ margin: 10 }}>
                      <TouchableOpacity
                        onPress={() => {
                          // console.log("edit button");
                          handleEdit(item);
                        }}
                      >
                        <Image
                          source={require("../../assets/edit.png")}
                          style={styles.icon}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {
                          deleteConfirm(item._id);
                        }}
                      >
                        <Image
                          source={require("../../assets/trash.jpg")}
                          style={[styles.icon, { marginTop: 50 }]}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
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
      </View>
    </SafeAreaView>
  );
};

export default ProductStatistics;
const styles = StyleSheet.create({
  headerModal: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  inputStyle: {
    width: "90%",
    height: 50,
    borderRadius: 10,
    borderWidth: 0.5,
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 10,
    marginBottom: 10,
    alignSelf: "center",
  },
  pickBtn: {
    width: "90%",
    height: 50,
    borderWidth: 0.5,
    borderRadius: 10,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  uploadBtn: {
    backgroundColor: "#000",
    width: "90%",
    height: 50,
    borderRadius: 10,
    alignSelf: "center",
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 70,
  },
  containerAlert: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
  },
  containerDialog: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    marginTop: 40,
    marginLeft: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  searchContainer: {
    height: 40,
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
    height: 40,
    width: 40,
    borderRadius: 10,
    backgroundColor: "#00B761",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  overviewProduct: {
    marginTop: 30,
    marginLeft: 15,
  },
  recentProduct: {
    flexDirection: "row",
    marginTop: 20,
    marginLeft: 15,
  },
  listProduct: {
    marginTop: 5,
    // marginLeft: 15,
    fontSize: 15,
  },
  itemView: {
    flexDirection: "row",
    width: "90%",
    alignSelf: "center",
    backgroundColor: "#fff",

    marginTop: 10,
    elevation: 4,
    borderRadius: 10,
    height: 120,
    marginBottom: 10,
  },
  imageView: {
    width: 90,
    height: 90,
    borderRadius: 10,
    margin: 5,
  },
  infoView: {
    width: "55%",
    margin: 10,
  },
  nameText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#00B771",
  },

  priceText: {
    fontSize: 18,
    color: "green",
    fontWeight: "700",
  },
  icon: {
    width: 24,
    height: 24,
  },
});
