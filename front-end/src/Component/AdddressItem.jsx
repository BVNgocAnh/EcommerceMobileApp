import React from "react";
import { Text, View, Image, TouchableOpacity, StyleSheet } from "react-native";
const AddressItem = ({ item, onAddAddress, onDeleteAddress }) => {
  return (
    <View
      style={{
        width: "100%",
        borderWidth: 0.2,
        borderColor: "#8e8e8e",
        alignSelf: "center",
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <View>
        <Text style={{ marginLeft: 20 }}>{/* {'City: ' + item.city} */}</Text>
        <Text style={{ marginLeft: 20 }}>
          {/* {'Building: ' + item.building} */}
          CTU
        </Text>
        <Text style={{ marginLeft: 20, marginBottom: 10 }}>
          {/* {'Pincode: ' + item.pincode} */}
          025846
        </Text>
      </View>
      <TouchableOpacity
        style={{ borderWidth: 0.2, padding: 7, marginRight: 20 }}
        // onPress={() => {
        //   dispatch(deleteAddress(index));
        // }}
      >
        <Text>Delete address</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddressItem;
