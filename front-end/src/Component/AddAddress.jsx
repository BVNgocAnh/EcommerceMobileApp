import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import InputTextCustom from "../Custom/InputTextCustom";
import CommonButton from "../Custom/CommonButton";
import { useDispatch } from "react-redux";
import addressReducer from "../redux/reducers/profileReducer";
import { addAddress } from "../redux/actions/Actions";
export default function AddAddress() {
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [mobilephone, setMobilephone] = useState("");
  const [cityLoca, setCityLoca] = useState("");
  const [streetLoca, setStreetLoca] = useState("");
  const dispatch = useDispatch();
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.aAddressHeader}>
        <TouchableOpacity
          style={styles.gobackButton}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Image
            source={require("../../assets/backButton.jpg")}
            style={{ width: 24, height: 24 }}
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.titleAdd}>ADD NEW ADDRESS</Text>
      <View>
        <Text style={styles.titleForm}>CONTACT</Text>
        <InputTextCustom
          placeholder={"Enter yourname"}
          value={username}
          onChangeText={(txt) => {
            setUsername(txt);
          }}
          icon={require("../../assets/user.jpg")}
        />
        <InputTextCustom
          placeholder={"Enter phone number"}
          value={mobilephone}
          keyboardType={"number-pad"}
          onChangeText={(txt) => {
            setMobilephone(txt);
          }}
          icon={require("../../assets/mobilephone.jpg")}
        />
        <Text style={styles.titleForm}>LOCATION</Text>
        <InputTextCustom
          placeholder={"Province/City"}
          value={cityLoca}
          onChangeText={(txt) => {
            setCityLoca(txt);
          }}
          icon={require("../../assets/cityLocation.jpg")}
        />
        <InputTextCustom
          placeholder={"Street: (Pham Ngu Lao Street)"}
          value={streetLoca}
          onChangeText={(txt) => {
            setStreetLoca(txt);
          }}
          icon={require("../../assets/location.jpg")}
        />
      </View>
      <CommonButton
        title={"SAVE ADDRESS"}
        bgColor={"#000"}
        textColor={"#fff"}
        onPress={() => {
          if (
            username !== "" &&
            mobilephone !== "" &&
            cityLoca !== "" &&
            streetLoca !== ""
          ) {
            dispatch(
              addAddress({
                username: username,
                mobilephone: mobilephone,
                cityLoca: cityLoca,
                streetLoca: streetLoca,
              })
            );
          }
          navigation.goBack();
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  aAddressHeader: {
    width: "100%",
    height: 70,
    marginTop: 20,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  gobackButton: {
    marginLeft: 20,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 0.2,
    padding: 7,
    borderRadius: 10,
  },
  titleAdd: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    fontWeight: "600",
    fontSize: 30,
  },
  titleForm: {
    fontWeight: "500",
    fontSize: 15,
    marginTop: 20,
    marginLeft: 10,
  },
});
