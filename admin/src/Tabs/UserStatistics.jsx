import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
  Modal,
  TextInput,
} from "react-native";
import React, { useState, useEffect } from "react";
import useFetch from "../Hooks/useEffect";
import { LineChart } from "react-native-chart-kit";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { customerAPI, customerStats } from "../config";
import * as ImagePicker from "expo-image-picker";
const UserStatistics = () => {
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);
  const [emailCus, setEmailCus] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [image, setImage] = useState("");
  const [sex, setSex] = useState("");
  const [phoneCus, setPhoneCus] = useState("");
  const [addressCus, setAddressCus] = useState("");
  const [idEdit, setIdEdit] = useState("");
  const { data, loading, error } = useFetch("server/customer/stats");
  const { data: dataUser } = useFetch("server/customer");
  const handleVisibleModal = () => {
    setVisible(!visible);
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

  const chartData = {
    labels: data?.map((item) => item._id),
    datasets: data?.map((item) => item.total),
  };
  console.log(chartData);

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
        { text: "OK", onPress: () => deleteUser(id) },
      ]
    );
  const deleteUser = (id) => {
    const deleteAPI = `${customerAPI}${id}`;
    console.log(deleteAPI);
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

  const handleSave = (id) => {
    const updateAPI = `${customerAPI}${id}`;
    if (!emailCus || !sex || !phoneCus || !phoneCus || !addressCus) {
      console.log("Please fill in all required fields");
      return;
    }
    fetch(updateAPI, {
      method: "PUT",
      body: JSON.stringify({
        emailCus: emailCus,
        sex: sex,
        phoneCus: phoneCus,
        addressCus: addressCus,
        image: imageUrl,
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
          setEmailCus("");
          setSex("");
          setPhoneCus("");
          setAddressCus("");
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
    setEmailCus(item.emailCus);
    setSex(item.sex);
    setPhoneCus(item.phoneCus);
    setAddressCus(item.addressCus);
    setImageUrl(item.imageUrl);
    setImage(item.image);
    setIdEdit(item._id);
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFF" }}>
      <ScrollView>
        <View>
          <View style={styles.header}>
            <View>
              <Text style={{ fontSize: 25, fontWeight: "bold" }}>
                USER STATISTICS
              </Text>
              <Text
                style={{ fontSize: 30, color: "#00B761", fontWeight: "bold" }}
              >
                CAVA Specialty Coffee
              </Text>
            </View>
          </View>
          <View style={styles.overviewUser}>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>Overview</Text>
            {chartData.labels.length > 0 ? (
              <LineChart
                data={{
                  labels: chartData?.labels,
                  datasets: [
                    {
                      data: chartData?.datasets,
                    },
                  ],
                }}
                width={400} // from react-native
                height={220}
                yAxisLabel=""
                yAxisSuffix=""
                yAxisInterval={9} // optional, defaults to 1
                chartConfig={{
                  backgroundColor: "#0F52BA",
                  backgroundGradientFrom: "#0F52BA",
                  backgroundGradientTo: "#89CFEF",
                  decimalPlaces: 0, // optional, defaults to 2dp
                  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                  labelColor: (opacity = 1) =>
                    `rgba(255, 255, 255, ${opacity})`,
                  style: {
                    borderRadius: 16,
                  },
                  propsForDots: {
                    r: "6",
                    strokeWidth: "2",
                    stroke: "#89CFEF",
                  },
                }}
                bezier
                style={{
                  marginVertical: 8,
                  borderRadius: 16,
                }}
              />
            ) : (
              <Text>Chart data not exist</Text>
            )}

            <Text
              style={{
                alignSelf: "center",
                fontSize: 15,
                fontWeight: "bold",
              }}
            >
              User Analyze Chart
            </Text>
          </View>
          <Modal visible={visible}>
            <SafeAreaView>
              <View>
                <View style={styles.headerModal}>
                  <Text
                    style={{ fontSize: 25, fontWeight: "bold", marginLeft: 10 }}
                  >
                    EDIT CUSTOMER
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
                    <Text>Email</Text>
                    <TextInput
                      placeholder="Enter email"
                      style={styles.inputStyle}
                      value={emailCus}
                      onChangeText={(text) => setEmailCus(text)}
                    />
                    <Text>Phone</Text>
                    <TextInput
                      placeholder="Enter phone number"
                      style={styles.inputStyle}
                      value={phoneCus}
                      onChangeText={(text) => setPhoneCus(text)}
                    />
                    <Text>Sexual</Text>
                    <TextInput
                      placeholder="Male or Female"
                      style={styles.inputStyle}
                      value={sex}
                      onChangeText={(text) => setSex(text)}
                    />
                    <Text>Address</Text>
                    <TextInput
                      placeholder="Enter product description"
                      style={styles.inputStyle}
                      value={addressCus}
                      onChangeText={(text) => setAddressCus(text)}
                    />

                    <Text>Image</Text>
                    <TextInput
                      placeholder="Enter Item Image URL"
                      style={styles.inputStyle}
                      value={imageUrl}
                      onChangeText={(text) => setImageUrl(text)}
                    />

                    <Text style={{ alignSelf: "center", marginTop: 10 }}>
                      OR
                    </Text>
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
          <View style={styles.recentUser}>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              Recent Users
            </Text>
          </View>
          <SafeAreaView style={{}}>
            <View style={styles.listProduct}>
              <FlatList
                data={dataUser}
                renderItem={({ item, index }) => {
                  return (
                    <View style={styles.itemView}>
                      <Image
                        source={{ uri: item.image }}
                        style={styles.imageView}
                      />
                      <View style={styles.infoView}>
                        <Text style={styles.nameText}>{item.nameCus}</Text>
                        <Text style={styles.priceView}>{item.emailCus}</Text>
                      </View>
                      <View style={{ margin: 10, flexDirection: "row" }}>
                        <TouchableOpacity
                          onPress={() => {
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
                            style={[styles.icon, { marginLeft: 20 }]}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  );
                }}
              />
            </View>
          </SafeAreaView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default UserStatistics;

const styles = StyleSheet.create({
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
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    marginTop: 40,
    marginLeft: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  overviewUser: {
    marginTop: 30,
    marginLeft: 15,
  },
  recentUser: {
    marginTop: 20,
    marginLeft: 15,
  },
  listProduct: {
    marginTop: 10,
    fontSize: 15,
  },
  itemView: {
    flexDirection: "row",
    width: "90%",
    alignSelf: "center",
    backgroundColor: "#fff",
    marginTop: 10,
    height: 60,
    marginBottom: 10,
    elevation: 4,
    borderRadius: 10,
  },
  imageView: {
    width: 40,
    height: 40,
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
    width: 20,
    height: 20,
  },
});
