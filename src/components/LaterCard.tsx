import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { tagColors } from "../utils/constants";

import Clock from "../../assets/clock.svg";
import Calendar from "../../assets/calendar.svg";
import Spacer from "./Spacer";
import TextTicker from "react-native-text-ticker";

type Props = {
  tag: string;
  time: string;
  date: string;
  task: string;
};

const ls = StyleSheet.create({
  root: {
    borderRadius: 10,
    backgroundColor: "#262C2F",
    marginHorizontal: 24,
    overflow: "hidden",
    flexDirection: "row",
    marginVertical: 6,
  },
  leftIndicator: {
    position: "relative",
    left: 0,
    width: 8,
  },
  taskF: {
    fontFamily: "Inter-SemiBold",
    fontSize: 19,
    color: "#D5E2ED",
  },
  taskR: {
    fontFamily: "Inter-Regular",
    fontSize: 19,
    color: "#D5E2ED",
  },
  taskInfo: {
    fontFamily: "Inter-Regular",
    fontSize: 12.5,
    color: "#8e9193",
  },
});

const Circle = () => (
  <View
    style={{
      height: 18,
      width: 18,
      borderColor: "#ffffff",
      borderWidth: 1,
      alignSelf: "center",
      marginLeft: 12,
      borderRadius: 12,
    }}
  />
);

const LaterCard = (p: Props) => {
  const [taskF, ...taskR] = p.task.split(" ");

  return (
    <View style={ls.root}>
      {/* Indicator */}
      <View
        style={{
          ...ls.leftIndicator,
          backgroundColor:
            p.tag == "work" || p.tag == "personal"
              ? tagColors[p.tag]
              : tagColors.work,
        }}
      />

      <Circle />

      {/* Content */}
      <View style={{ flex: 1, paddingVertical: 10, paddingHorizontal: 12 }}>
        {/* Title */}
        <TextTicker style={ls.taskR} numberOfLines={1} scrollSpeed={30}>
          <Text numberOfLines={1} style={ls.taskF}>
            {taskF}
          </Text>{" "}
          {taskR.join(" ")}
        </TextTicker>

        <Spacer height={2} />

        {/* Info */}
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Calendar height={12} width={12} fill="#8e9193" />
          <Spacer width={4} />
          <Text style={ls.taskInfo}>{p.date}</Text>

          <Spacer width={12} />

          <Clock height={12} width={12} fill="#8e9193" />
          <Spacer width={4} />
          <Text style={ls.taskInfo}>{p.time}</Text>
        </View>
      </View>
    </View>
  );
};

export default LaterCard;
