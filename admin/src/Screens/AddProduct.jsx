import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  PermissionsAndroid,
  Image,
  ScrollView,
  Button,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { productAPI } from "../config";
import * as ImagePicker from "expo-image-picker";
const AddProduct = () => {
  const navigation = useNavigation();
  const [nameProduct, setNameProduct] = useState("");
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState(null);
  const [price, setPrice] = useState("");
  const [weight, setWeight] = useState("");
  const [category, setCategory] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleCreate = () => {
    const createAPI = `${productAPI}`;
    if (!nameProduct || !desc || !price) {
      console.log("Please fill in all required fields");
      return;
    }
    fetch(createAPI, {
      method: "POST",
      body: JSON.stringify({
        nameProduct: nameProduct,
        desc: desc,
        price: price,
        weight: weight,
        image: imageUrl,
        category: [category],
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
          console.log(result);
        },
        (error) => {
          console.log(error);
        }
      );
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
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={{ fontSize: 25, fontWeight: "bold" }}>
            ADD NEW PRODUCT
          </Text>
          <Text style={{ fontSize: 30, color: "#00B761", fontWeight: "bold" }}>
            CAVA Specialty Coffee
          </Text>
        </View>
      </View>
      <ScrollView style={styles.container}>
        <View style={{ paddingHorizontal: 10, marginTop: 20 }}>
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
        </View>
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
            handleCreate();
          }}
        >
          <Text style={{ color: "#Fff" }}>Save New</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default AddProduct;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    marginTop: 40,
    marginLeft: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerText: {
    fontSize: 18,
    fontWeight: "700",
    marginTop: 20,
    marginRight: 10,
  },
  gobackButton: {
    marginLeft: 20,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
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
  // imageStyle: {
  //   width: "90%",
  //   height: 200,
  //   borderRadius: 10,
  //   alignSelf: "center",
  //   marginTop: 20,
  // },
});
