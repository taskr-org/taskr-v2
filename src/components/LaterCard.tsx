import React, { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { tagColors } from "../utils/constants";

import Clock from "../../assets/clock.svg";
import Calendar from "../../assets/calendar.svg";
import Spacer from "./Spacer";
import TextTicker from "react-native-text-ticker";
import GestureRecognizer from "react-native-swipe-detect";

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
  optionView: {
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
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
  const [optionsVisible, setOptionsVisible] = useState<boolean>(false);

  return (
    <GestureRecognizer
      onSwipeLeft={() => setOptionsVisible(true)}
      onSwipeRight={() => setOptionsVisible(false)}
    >
      <Pressable onLongPress={() => setOptionsVisible(!optionsVisible)}>
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

            {/* Options */}
            <View
              style={{
                position: "absolute",
                right: 0,
                top: 0,
                bottom: 0,
                opacity: optionsVisible ? 1 : 0,
                flexDirection: "row",
              }}
            >
              <View
                style={{
                  ...ls.optionView,
                  backgroundColor: "#FF6969",
                }}
              >
                <Text
                  style={{
                    color: "#FFFFFF",
                    fontWeight: "bold",
                  }}
                >
                  Skip
                </Text>
              </View>

              <View
                style={{
                  ...ls.optionView,
                  backgroundColor: "#22C34F",
                }}
              >
                <View
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  <Text style={{ color: "#FFFFFF", fontWeight: "bold" }}>
                    Mark
                  </Text>
                  <Text style={{ color: "#FFFFFF", fontWeight: "bold" }}>
                    Complete
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Pressable>
    </GestureRecognizer>
  );
};

export default LaterCard;
