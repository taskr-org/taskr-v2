import React from "react";

import { StyleSheet, Text, View } from "react-native";
import { TouchableRipple } from "react-native-paper";

type Props = {
  text: string;
  onClick?: () => void | Promise<void>;
};

const ls = StyleSheet.create({
  root: {
    backgroundColor: "#31404D",
    borderRadius: 20,
    padding: 20,
  },
  tag: {
    paddingHorizontal: 11,
    paddingVertical: 2.5,
    backgroundColor: "#15CA73",
    borderRadius: 14,
    alignSelf: "flex-start",
  },
  tagText: {
    letterSpacing: 1.05,
    fontFamily: "Inter-Medium",
  },
});

export function UpcomingCard() {
  return (
    <>
      <View style={ls.root}>
        <View style={ls.tag}>
          <Text style={ls.tagText}>WORK</Text>
        </View>
      </View>
    </>
  );
}
