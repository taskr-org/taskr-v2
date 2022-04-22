import React from "react";

import { Text, View } from "react-native";
import { TouchableRipple } from "react-native-paper";

type Props = {
  text: string;
  onClick?: () => Promise<void>;
};

function Button(p: Props) {
  return (
    <TouchableRipple
      style={{ backgroundColor: "#D7E3ED", borderRadius: 6 }}
      rippleColor="#282F34"
      onPress={() => {
        p.onClick && p.onClick();
      }}
    >
      <View
        style={{
          borderRadius: 6,
          borderColor: "#BDC6CE",
          borderWidth: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            padding: 12,
            color: "#282F34",
            fontFamily: "Inter-Medium",
            fontSize: 16,
          }}
        >
          {p.text}
        </Text>
      </View>
    </TouchableRipple>
  );
}

export default Button;
