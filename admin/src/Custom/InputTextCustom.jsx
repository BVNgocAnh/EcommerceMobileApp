import React, { useState } from "react";
import { View, TextInput, Image } from "react-native";

const InputTextCustom = ({
  value,
  onChangeText,
  placeholder,
  icon,
  type,
  keyboardType,
}) => {
  const [text, setText] = useState(value);
  return (
    <View
      style={{
        width: "85%",
        height: 50,
        borderWidth: 1,
        borderRadius: 10,
        alignSelf: "center",
        marginTop: 20,
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: 20,
        paddingRight: 20,
      }}
    >
      <Image source={icon} style={{ width: 24, height: 24 }} />
      <TextInput
        value={value}
        keyboardType={keyboardType ? keyboardType : "default"}
        onChangeText={(txt) => {
          onChangeText(txt);
        }}
        placeholder={placeholder}
        secureTextEntry={type ? true : false}
        style={{ marginLeft: 10 }}
      />
    </View>
  );
};

export default InputTextCustom;
