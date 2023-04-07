import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  Text,
  View,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import useFetch from "../Hooks/useEffect";
import ItemCheckout from "../Component/ItemCheckout";
import CommonButton from "../Custom/CommonButton";
import { useNavigation } from "@react-navigation/native";
import HomeScreen from "./HomeScreen";
const Checkout = () => {
  const navigation = useNavigation();
  const cartData = useSelector((state) => state.cartReducer);
  const [listCart, setListCart] = useState(cartData);
  const [selectedCart, setSelectedCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectedAll, setSelecteddAll] = useState(false);

  const handleFilterData = (data) => {
    const filterData = data.filter((value) => {
      return value.selected;
    });
    setSelectedCart(filterData);
  };

  const handleChecklistCart = (item) => {
    const selectItem = listCart.map((data) => {
      if (data._id === item._id) {
        return {
          ...data,
          selected: !data?.selected,
        };
      } else {
        return data;
      }
    });
    setListCart(selectItem);

    handleFilterData(selectItem);
  };

  const handleCaltulatePrice = () => {
    const calculatePrice = selectedCart.reduce(
      (acc, val) => acc + val.price * val.quantity,
      0
    );

    setTotalPrice(calculatePrice);
  };

  const handleSelectedAll = () => {
    const filterCart = listCart.map((data) => {
      if (selectedAll) {
        return {
          ...data,
          selected: false,
        };
      } else {
        return {
          ...data,
          selected: true,
        };
      }
    });

    setListCart(filterCart);
    handleFilterData(filterCart);
  };

  const validateSelectedAll = () => {
    const data = listCart.every((value) => value.selected === true);
    setSelecteddAll(data);
  };

  const handleAddQuantity = (item) => {
    const selectItem = listCart.map((data) => {
      if (data._id === item._id) {
        return {
          ...data,
          quantity: data.quantity + 1,
        };
      } else {
        return data;
      }
    });
    setListCart(selectItem);
    handleFilterData(selectItem);
  };

  const handleReduceQuantity = (item) => {
    const selectItem = listCart.map((data) => {
      if (data._id === item._id) {
        if (data.quantity === 1) {
          return {
            ...data,
            quantity: 1,
          };
        }
        return {
          ...data,
          quantity: data.quantity - 1,
        };
      } else {
        return data;
      }
    });
    setListCart(selectItem);
    handleFilterData(selectItem);
  };
  useEffect(() => {
    handleCaltulatePrice();
    validateSelectedAll();
  }, [selectedCart]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, marginTop: 60 }}>
        <Text style={styles.titleCart}>CHECKOUT PAGE</Text>
        <View>
          {/* <FlatList
            data={cartData}
            renderItem={({ item, index }) => {
              return (
                <View style={styles.containerItemCart}>
                  <TouchableOpacity style={styles.button}>
                    <Text style={styles.iconPlus}>V</Text>
                  </TouchableOpacity>
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
                      <TouchableOpacity
                        style={styles.buttonQuantity}
                        onPress={() => {
                          decrementQuantity();
                        }}
                      >
                        <Text style={{ color: "#FFF" }}>-</Text>
                      </TouchableOpacity>
                      <Text style={{ marginLeft: 10 }}>{quantity}</Text>
                      <TouchableOpacity
                        style={styles.buttonQuantity}
                        onPress={() => {
                          incrementQuantity();
                        }}
                      >
                        <Text style={{ color: "#FFF" }}>+</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              );
            }}
          /> */}
          {/* <FlatList
            data={cartData}
            renderItem={({ item, index }) => {
              return (
                <View style={styles.container}>
                  <View style={styles.wrapperImageCheck}>
                    <TouchableOpacity style={styles.button}>
                      <Text style={styles.iconPlus}>V</Text>
                    </TouchableOpacity>
                    <Image
                      source={{ uri: item.image }}
                      style={styles.productImage}
                    />
                  </View>
                  <View>
                    <View>
                      <Text style={{ fontSize: 17, fontWeight: "500" }}>
                        {item.nameProduct}
                      </Text>
                      <Text
                        style={{
                          marginTop: 5,
                          fontSize: 16,
                          fontWeight: "450",
                          textTransform: "capitalize",
                        }}
                      >
                        {item.category}
                      </Text>
                      <Text
                        style={{
                          marginTop: 5,
                          fontSize: 17,
                          fontWeight: "600",
                        }}
                      >
                        $ {item.price}
                      </Text>
                    </View>
                    <View style={styles.containerButton}>
                      <TouchableOpacity
                        style={styles.buttonQuantity}
                        onPress={() => {
                          decrementQuantity();
                        }}
                      >
                        <Text style={{ color: "#FFF" }}>-</Text>
                      </TouchableOpacity>
                      <Text style={{ marginLeft: 10 }}>{quantity}</Text>
                      <TouchableOpacity
                        style={styles.buttonQuantity}
                        onPress={() => {
                          incrementQuantity();
                        }}
                      >
                        <Text style={{ color: "#FFF" }}>+</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              );
            }}
          /> */}
        </View>
        <View>
          <FlatList
            data={listCart}
            renderItem={({ item }) => {
              return (
                <ItemCheckout
                  data={item}
                  onCheckItem={() => handleChecklistCart(item)}
                  addQuantity={() => handleAddQuantity(item)}
                  reduceQuantity={() => handleReduceQuantity(item)}
                />
              );
            }}
          />
        </View>
      </View>
      <View style={styles.footer}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity style={styles.button} onPress={handleSelectedAll}>
            <Text style={styles.iconPlus}>{selectedAll ? "V" : ""}</Text>
          </TouchableOpacity>
          <Text style={[styles.textFooter, { marginRight: 10 }]}>
            Total Price
          </Text>
          <Text style={styles.textFooter}>${totalPrice}</Text>
        </View>
        <TouchableOpacity
          style={[styles.buttonCheckout, { backgroundColor: "orange" }]}
          onPress={() => {
            navigation.navigate("PaymentSuccess");
          }}
        >
          <Text
            style={{
              color: "black",
              fontSize: 16,
              alignItems: "center",
              fontWeight: "400",
            }}
          >
            Checkout
          </Text>
        </TouchableOpacity>
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
