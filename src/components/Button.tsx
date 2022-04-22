import React from "react";

import { Text, View } from "react-native";

type Props = {
  text: string;
};

function Button(p: Props) {
  return (
    <View
      style={{
        borderRadius: 6,
        backgroundColor: "#D7E3ED",
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
  );
}

export default Button;
