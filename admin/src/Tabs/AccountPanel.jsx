import { View, Text, StyleSheet } from "react-native";
import React from "react";
import useFetch from "../Hooks/useEffect";
const AccountPanel = () => {
  const { data: dataUser } = useFetch("server/customer");
  console.log(dataUser);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={{ fontSize: 25, fontWeight: "bold" }}>USER PANEL</Text>
          <Text style={{ fontSize: 30, color: "#00B761", fontWeight: "bold" }}>
            CAVA Specialty Coffee
          </Text>
        </View>
      </View>
    </View>
  );
};

export default AccountPanel;

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
});
