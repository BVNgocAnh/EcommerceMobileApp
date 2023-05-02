import React from "react";
import { TouchableOpacity, Text } from "react-native";
const CommonButton = ({ onPress, title, bgColor, textColor, disabled }) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      style={{
        backgroundColor: bgColor,
        justifyContent: "center",
        alignItems: "center",
        width: "85%",
        height: 50,
        borderRadius: 10,
        alignSelf: "center",
        marginTop: 30,
      }}
      onPress={() => {
        onPress();
      }}
    >
      <Text style={{ color: textColor }}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CommonButton;
