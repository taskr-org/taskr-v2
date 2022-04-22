import React from "react";
import { View } from "react-native";

type Props = {
  height?: number;
  width?: number;
};

function Spacer(p: Props) {
  return (
    <View
      style={{
        height: p.height || 0,
        width: p.width || 0,
      }}
    />
  );
}

export default Spacer;
