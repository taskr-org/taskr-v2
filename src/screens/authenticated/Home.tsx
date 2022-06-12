import React from "react";

import { StackScreenProps } from "@react-navigation/stack";
import { ThemeContext } from "../../contexts/ThemeContext";
import { Pressable, StyleSheet, Text, Touchable, View } from "react-native";
import { getCommonStyles } from "../../misc/common-styles";
import Spacer from "../../components/Spacer";
import { AuthContext } from "../../contexts/AuthContext";
import { sure } from "../../utils/auth-utils";
import { UpcomingCard } from "../../components/UpcomingCard";
import { capitaliseStart } from "../../utils/generic-utils";
import { ScrollView } from "react-native-gesture-handler";
import LaterCard from "../../components/LaterCard";
import ProfileIcon from "../../../assets/profile.svg";
import { TouchableRipple } from "react-native-paper";

type Props = StackScreenProps<AuthenticatedSPL, "Home">;

export default function Login(_navProps: Props) {
  let { theme } = React.useContext(ThemeContext);
  const { authInfo, setAuthInfo } = React.useContext(sure(AuthContext));

  const styles = getCommonStyles(theme);

  const ls = StyleSheet.create({
    sectionHeader: {
      fontFamily: "Inter-Medium",
      letterSpacing: 1.6,
      paddingHorizontal: 26,
      color: "#fbfbfb",
    },
  });

  return (
    <View style={{ ...styles.root }}>
      <Spacer height={30} />

      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        {/* Header */}
        <View style={{ paddingHorizontal: 25 }}>
          <Text style={{ ...styles.textBold, fontSize: 28 }}>
            Hi {capitaliseStart(authInfo.username)}!
          </Text>
          <Text
            style={{
              fontFamily: "Inter-Medium",
              color: "#777D81",
              fontSize: 20,
              fontWeight: "500",
            }}
          >
            Let's organise your day
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
            marginEnd: 18,
            alignSelf: "center",
          }}
        >
          <TouchableRipple
            onPress={() => {
              setAuthInfo({ authenticated: false });
            }}
          >
            <ProfileIcon height={19} width={19} fill="#FFFFFF" />
          </TouchableRipple>
        </View>
      </View>

      <Spacer height={30} />

      {/* Upcoming task list */}
      <View>
        <Text style={ls.sectionHeader}>UPCOMING TASKS</Text>

        <Spacer height={12} />

        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          <View style={{ width: 26 }} />

          <UpcomingCard
            tag="work"
            time="10:30"
            date="Tomorrow"
            task="Meet Udit"
          />

          <UpcomingCard
            tag="personal"
            time="05:00"
            date="24/8/2022"
            task="Tell Arthur about Micah"
          />

          <UpcomingCard
            tag="work"
            time="02:45"
            date="3/11/2022"
            task="Ride to Saint Denis"
          />
        </ScrollView>
      </View>

      <Spacer height={30} />

      {/* Later this month */}
      <View style={{ flexShrink: 1 }}>
        <Text style={ls.sectionHeader}>LATER THIS MONTH</Text>

        <Spacer height={12} />

        <ScrollView showsVerticalScrollIndicator={false}>
          <LaterCard tag="work" task="Meet Hosea" date="Today" time="15:45" />

          <LaterCard
            tag="personal"
            task="Pay Electricity Bill"
            date="12/6/2022"
            time="8:00"
          />

          <LaterCard
            tag="work"
            task="Publish Figma Component"
            date="25/6/2022"
            time="17:30"
          />

          <LaterCard tag="work" task="Meet Hosea" date="Today" time="15:45" />
          <LaterCard tag="work" task="Meet John" date="Today" time="15:45" />
        </ScrollView>
      </View>

      {/* FAB */}
      <TouchableRipple
        rippleColor="#202020"
        borderless
        style={{
          borderRadius: 30,
          position: "absolute",
          bottom: 25,
          right: 20,
          elevation: 10,
          shadowColor: "#353535",
        }}
        onPress={() => {
          console.log("hah");
        }}
      >
        <View style={{ backgroundColor: "#F2F2F2" }}>
          <Text
            style={{
              ...styles.textSemiBold,
              paddingHorizontal: 22,
              paddingVertical: 15,
              color: "black",
            }}
          >
            + Add New
          </Text>
        </View>
      </TouchableRipple>
    </View>
  );
}
