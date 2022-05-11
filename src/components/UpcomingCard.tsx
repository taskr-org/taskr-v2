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
    padding: 8,
    backgroundColor: "#15CA73",
    borderRadius: 9,
  },
});

export function UpcomingCard() {
  return (
    <>
      <View style={ls.root}>
        <View style={ls.tag}>
          <Text style={{ letterSpacing: 1.12, fontWeight: "500" }}>WORK</Text>
        </View>
      </View>
    </>
  );
}
