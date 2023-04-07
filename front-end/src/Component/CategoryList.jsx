import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
const CategoryList = () => {
  const [categoryIndex, setCategoryIndex] = useState(0);
  const categories = ["arabica", "robusta"];
  return (
    <View style={styles.categoryContainer}>
      {categories.map((item, index) => (
        <TouchableOpacity
          key={index}
          activeOpacity={0.8}
          onPress={() => setCategoryIndex(index)}
        >
          <Text
            style={[
              styles.categoryText,
              categoryIndex === index && styles.categoryTextSelected,
            ]}
          >
            {item}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default CategoryList;
const styles = StyleSheet.create({
  categoryContainer: {
    flexDirection: "row",
    marginTop: 30,
    marginBottom: 20,
    justifyContent: "space-evenly",
  },
  categoryText: {
    fontSize: 16,
    color: "grey",
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  categoryTextSelected: {
    color: "#00B761",
    paddingBottom: 5,
    borderBottomWidth: 2,
    borderColor: "#00B761",
  },
});
