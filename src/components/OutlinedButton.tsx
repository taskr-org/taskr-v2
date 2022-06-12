import React from "react";

import { Text, View } from "react-native";
import { TouchableRipple } from "react-native-paper";

type Props = {
  text: string;
  theme: AppTheme;
  onClick?: () => void;
};

function OutlinedButton(p: Props) {
  return (
    <TouchableRipple
      borderless
      style={{
        borderRadius: 6,
        borderWidth: 1,
        borderColor: "#F2F2F2",
      }}
      onPress={() => {
        p.onClick && p.onClick();
      }}
    >
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            padding: 12,
            color: "#F2F2F2",
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

export default OutlinedButton;
