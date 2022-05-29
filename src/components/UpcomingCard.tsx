import React from "react";

import { StyleSheet, Text, View } from "react-native";
import Clock from "../../assets/clock.svg";
import Calendar from "../../assets/calendar.svg";
import Alarm from "../../assets/alarm.svg";
import Spacer from "./Spacer";
import TextTicker from "react-native-text-ticker";
import { tagColors } from "../utils/constants";

type Props = {
  tag: string;
  time: string;
  date: string;
  task: string;
};

const ls = StyleSheet.create({
  root: {
    backgroundColor: "#262C2F",
    borderRadius: 10,
    width: 265,
    paddingTop: 20,
    paddingBottom: 15,
    paddingLeft: 20,
    paddingRight: 16,
    alignSelf: "flex-start",
    marginEnd: 14,
  },
  tag: {
    paddingHorizontal: 8,
    paddingVertical: 2.5,
    marginLeft: -0.5,
    marginBottom: 6,
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

export function UpcomingCard(p: Props) {
  const [taskF, ...taskR] = p.task.split(" ");

  return (
    <>
      <View style={ls.root}>
        <View
          style={{
            ...ls.tag,
            backgroundColor:
              p.tag == "work" || p.tag == "personal"
                ? tagColors[p.tag]
                : tagColors.work,
          }}
        >
          <Text style={ls.tagText}>{p.tag.toUpperCase()}</Text>
        </View>

        <Spacer height={8} />

        {/* Title */}
        <TextTicker style={ls.taskR} numberOfLines={1} scrollSpeed={30}>
          <Text numberOfLines={1} style={ls.taskF}>
            {taskF}
          </Text>{" "}
          {taskR.join(" ")}
        </TextTicker>

        <Spacer height={3} />

        {/* Info */}
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Clock height={12} width={12} fill="#879AAB" />
          <Spacer width={4} />
          <Text style={ls.taskInfo}>{p.time}</Text>

          <Spacer width={12} />

          <Calendar height={12} width={12} fill="#879AAB" />
          <Spacer width={4} />
          <Text style={ls.taskInfo}>{p.date}</Text>
        </View>

        <Spacer height={20} />

        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          {/* Mark Completed */}
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#3b4143",
              paddingHorizontal: 15,
              borderRadius: 18,
            }}
          >
            <Text
              style={{
                color: "#ffffff",
                fontSize: 12.2,
                fontFamily: "Inter-Regular",
              }}
            >
              Mark Complete
            </Text>
          </View>

          {/* Reminder */}
          <View
            style={{
              height: 34,
              width: 34,
              borderRadius: 17,
              backgroundColor: "#3b4143",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Alarm height={15} width={15} fill="#FFFFFF" />
          </View>
        </View>

        <Spacer height={6} />
      </View>
    </>
  );
}
