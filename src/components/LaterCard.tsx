import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { tagColors } from "../utils/constants";

type Props = {};

const ls = StyleSheet.create({
  root: {
    borderRadius: 10,
    backgroundColor: "#31404D",
    height: 66,
    marginHorizontal: 24,
    overflow: "hidden",
  },
  leftIndicator: {
    backgroundColor: tagColors.work,
    flex: 1,
    alignSelf: "flex-start",
    width: 8,
  },
  front: {
    flex: 1,
  },
  back: {},
});

const LaterCard = (p: Props) => {
  return (
    <View style={ls.root}>
      <View style={ls.front}>
        <View style={ls.leftIndicator} />
      </View>
    </View>
  );
};

export default LaterCard;
