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
    paddingLeft: 22,
    paddingTop: 25,
    paddingBottom: 25,
    paddingRight: 40,
    alignSelf: "flex-start",
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
    fontFamily: "Inter-SemiBold",
    fontSize: 10.5,
  },
  taskF: {
    fontFamily: "Inter-SemiBold",
    fontSize: 20,
    color: "#D5E2ED",
  },
  taskR: {
    fontFamily: "Inter-Regular",
    fontSize: 20,
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

        <Spacer height={8} />

        {/* Title */}
        <Text style={ls.taskR}>
          <Text style={ls.taskF}>Meet</Text> Jones Barry
        </Text>

        <Spacer height={3} />

        {/* Info */}
        <View style={{ flexDirection: "row" }}>
          <Text style={ls.taskInfo}>10:00</Text>
          <Spacer width={10} />
          <Text style={ls.taskInfo}>Tomorrow</Text>
        </View>

        <Spacer height={10} />

        <View style={{ flexDirection: "row-reverse" }}>
          <View
            style={{
              height: 28,
              width: 28,
              borderRadius: 14,
              backgroundColor: "#BDCBD8",
              marginRight: -20,
              marginBottom: -8,
            }}
          />
        </View>
      </View>
    </>
  );
}
