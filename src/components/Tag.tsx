import React from "react";
import { Text, TouchableRipple } from "react-native-paper";
import { StyleSheet, View } from "react-native";

type Params = {
  text: string;
  selectedTag: string;
  color: `#${string}`;
  onPress?: (tag: string) => void;
};

export default function Tag(p: Params) {
  const color = p.selectedTag == p.text ? p.color : "#5B646B";

  const ls = StyleSheet.create({
    root: {
      borderRadius: 26,
      borderColor: color,
      borderWidth: 1,
      alignSelf: "flex-start",
    },
    text: {
      paddingHorizontal: 10,
      paddingVertical: 4,
      color,
      fontWeight: "400",
      fontSize: 15,
    },
  });

  return (
    <TouchableRipple
      borderless
      onPress={() => {
        p.onPress && p.onPress(p.text);
      }}
      style={ls.root}
    >
      <Text style={ls.text}>{p.text}</Text>
    </TouchableRipple>
  );
}
