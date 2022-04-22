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
      onPress={() => {
        p.onClick && p.onClick();
      }}
    >
      <View
        style={{
          borderRadius: 6,
          backgroundColor: p.theme.bg,
          borderColor: "#ACB5BD",
          borderWidth: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            padding: 12,
            color: "#ACB5BD",
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
