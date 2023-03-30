import React, { useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { deleteAddress } from "../redux/actions/Actions";
export default function MyAddress() {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const addressList = useSelector((state) => state.addressReducer);
  const dispatch = useDispatch();
  console.log(addressList);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <View style={styles.addressHeader}>
          <Text style={{ fontWeight: "600", fontSize: 25, marginLeft: 15 }}>
            My Address
          </Text>
          <TouchableOpacity
            style={styles.addAddressButton}
            onPress={() => {
              navigation.navigate("AddAddress");
            }}
          >
            <Image
              source={require("../../assets/addButton.jpg")}
              style={{
                width: 35,
                height: 35,
              }}
            />
          </TouchableOpacity>
        </View>
        {addressList.length > 0 ? (
          <FlatList
            data={addressList}
            renderItem={({ item, index }) => {
              return (
                // <AddressItem />;
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("Profile");
                  }}
                >
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
                        dispatch(deleteAddress(index));
                      }}
                    >
                      <Image
                        source={require("../../assets/trashButton.jpg")}
                        style={{
                          width: 35,
                          height: 35,
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        ) : (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text>No Address. Please add new address!</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  addressHeader: {
    width: "100%",
    height: 70,
    marginTop: 20,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  addAddressButton: {
    marginRight: 20,
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
    padding: 7,
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
