import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import React, { useState } from "react";
import axios from "axios";
const URL = "http://192.168.3.25:3000/server/product";
export default function TestAPI() {
  const [respone, setRespone] = useState(null);

  const CallGetURL = () => {
    const data = axios
      .get(`${URL}`)
      .then((res) => {
        console.log(res.data);
        setRespone(JSON.stringify(res));
      })

      .catch((error) => {
        console.log("ERROR: ", error);
      });
  };

  const CallGetURLWithID = () => {
    console.log("Get URL With ID");
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <TouchableOpacity>
          <Text style={styles.button} onPress={() => CallGetURL()}>
            GET
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.button} onPress={() => CallGetURLWithID()}>
            GET URL WITH ID
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.button} onPress={() => CallGetURL()}>
            GET
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.button}>GET</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.content} numberOfLines={0}>
        {" "}
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    height: 40,
    width: 90,
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 5,
  },
  content: {
    borderWidth: 1,
    borderRadius: 5,
    height: 500,
    margin: 20,
    fontSize: 17,
  },
});
