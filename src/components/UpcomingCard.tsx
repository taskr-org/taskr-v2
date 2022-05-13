import React from "react";

import { StyleSheet, Text, View } from "react-native";
import { TouchableRipple } from "react-native-paper";
import Spacer from "./Spacer";

type Props = {
  text: string;
  onClick?: () => void | Promise<void>;
};

const ls = StyleSheet.create({
  root: {
    backgroundColor: "#31404D",
    borderRadius: 20,
    padding: 25,
  },
  tag: {
    paddingHorizontal: 12,
    paddingVertical: 2.5,
    backgroundColor: "#15CA73",
    borderRadius: 14,
    alignSelf: "flex-start",
  },
  tagText: {
    letterSpacing: 1.05,
    fontFamily: "Inter-Medium",
  },
  taskF: {
    fontFamily: "Inter-SemiBold",
    fontSize: 18,
    color: "#D5E2ED",
  },
  taskR: {
    fontFamily: "Inter-Regular",
    fontSize: 18,
    color: "#D5E2ED",
  },
  taskInfo: {
    fontFamily: "Inter-Regular",
    fontSize: 14,
    color: "#879AAB",
  },
});

export function UpcomingCard() {
  return (
    <>
      <View style={ls.root}>
        <View style={ls.tag}>
          <Text style={ls.tagText}>WORK</Text>
        </View>

        <Spacer height={12} />

        {/* Title */}
        <Text style={ls.taskR}>
          <Text style={ls.taskF}>Meet</Text> Jones Barry
        </Text>

        {/* Info */}
        <View style={{ flexDirection: "row" }}>
          <Text style={ls.taskInfo}>10:00</Text>
          <Spacer width={10} />
          <Text style={ls.taskInfo}>Tomorrow</Text>
        </View>
      </View>
    </>
  );
}
