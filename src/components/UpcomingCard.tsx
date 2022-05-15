import React from "react";

import { StyleSheet, Text, View } from "react-native";
import Clock from "../../assets/clock.svg";
import Calendar from "../../assets/calendar.svg";
import Alarm from "../../assets/alarm.svg";
import Spacer from "./Spacer";

type Props = {
  text: string;
  onClick?: () => void | Promise<void>;
};

const ls = StyleSheet.create({
  root: {
    backgroundColor: "#31404D",
    borderRadius: 20,
    width: 240,
    paddingTop: 20,
    paddingBottom: 15,
    paddingLeft: 20,
    paddingRight: 16,
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
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Clock height={12} width={12} fill="#879AAB" />
          <Spacer width={4} />
          <Text style={ls.taskInfo}>10:00</Text>

          <Spacer width={12} />

          <Calendar height={12} width={12} fill="#879AAB" />
          <Spacer width={4} />
          <Text style={ls.taskInfo}>Tomorrow</Text>
        </View>

        <Spacer height={10} />

        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View />
          <View
            style={{
              height: 34,
              width: 34,
              borderRadius: 17,
              backgroundColor: "#BDCBD8",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Alarm height={16} width={16} fill="#31404D" />
          </View>
        </View>
      </View>
    </>
  );
}
