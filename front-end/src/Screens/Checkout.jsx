import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  View,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { useSelector } from "react-redux";
import { deleteAddress } from "../redux/actions/Actions";
const Checkout = () => {
  const cartData = useSelector((state) => state.cartReducer);
  const addressList = useSelector((state) => state.addressReducer);
  const [selectedAddress, setSelectedAddress] = useState("");
  const getTotal = () => {
    let tempTotal = 0;
    cartData.map((item) => {
      tempTotal = tempTotal + item.price;
    });
    return tempTotal;
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, marginTop: 60 }}>
        <Text style={styles.titleCart}>CHECKOUT PAGE</Text>
        <View>
          <FlatList
            data={cartData}
            renderItem={({ item, index }) => {
              return (
                <View style={styles.containerItemCart}>
                  <Image
                    style={styles.imageItemCart}
                    source={{ uri: item.image }}
                  />
                  <View style={{ padding: 10 }}>
                    <Text style={{ fontSize: 18, fontWeight: "600" }}>
                      {item.nameProduct}
                    </Text>
                    <Text
                      style={{
                        marginTop: 5,
                        fontSize: 15,
                        fontWeight: "400",
                        textTransform: "capitalize",
                      }}
                    >
                      {item.category}
                    </Text>
                    <Text
                      style={{ marginTop: 5, fontSize: 15, fontWeight: "600" }}
                    >
                      {"$ " + item.price}
                    </Text>
                    <View style={styles.containerButton}>
                      <TouchableOpacity style={styles.buttonQuantity}>
                        <Text style={{ color: "#FFF" }}>-</Text>
                      </TouchableOpacity>
                      <Text style={{ marginLeft: 10 }}>{"1"}</Text>
                      <TouchableOpacity style={styles.buttonQuantity}>
                        <Text style={{ color: "#FFF" }}>+</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              );
            }}
          />
        </View>
        <View style={styles.totalPrice}>
          <Text style={{ fontSize: 23 }}>TOTAL:</Text>
          <Text style={{ fontSize: 23 }}>{"$" + getTotal()}</Text>
        </View>
        {/* <View>
          <FlatList
            data={addressList}
            renderItem={({ item, index }) => {
              return (
                // <AddressItem />;
                <TouchableOpacity>
                  <View style={styles.addressItem}>
                    <View>
                      <Text style={{ marginLeft: 20 }}>
                        {"Name: " + item.username}
                      </Text>
                      <Text style={{ marginLeft: 20 }}>
                        {"Mobilephone: " + item.mobilephone}
                      </Text>
                      <Text style={{ marginLeft: 20 }}>
                        {"Province/City: " + item.cityLoca}
                      </Text>
                      <Text style={{ marginLeft: 20 }}>
                        {"Street: " + item.streetLoca}
                      </Text>
                    </View>
                    <TouchableOpacity
                      style={{ padding: 7, marginRight: 20 }}
                      onPress={() => {
                        //   dispatch(deleteAddress(index));
                        console.log("Select Address");
                      }}
                    >
                      <Text>Select address</Text>
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View> */}
      </View>
    </SafeAreaView>
  );
};

export default Checkout;

const styles = StyleSheet.create({
  titleCart: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    fontWeight: "600",
    fontSize: 22,
  },
  containerItemCart: {
    width: "97%",
    height: 130,
    flexDirection: "row",
    marginTop: 20,
    backgroundColor: "#FFF",
    borderRadius: 12,
    marginLeft: 5,
  },

  imageItemCart: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    width: 120,
    height: 110,
    marginLeft: 10,
    borderRadius: 10,
  },
  totalPrice: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 30,
    borderTopWidth: 0.5,
    height: 50,
    borderTopColor: "#8e8e8e",
  },
  containerButton: {
    flexDirection: "row",
    paddingLeft: 170,
  },
  buttonQuantity: {
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
  addressItem: {
    width: "100%",
    height: 100,
    borderWidth: 0.5,
    borderColor: "#8e8e8e",
    borderBottomColor: "#000",
    alignSelf: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
});
