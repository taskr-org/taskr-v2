import React, { useEffect, useState } from "react";

import { StackScreenProps } from "@react-navigation/stack";
import { ThemeContext } from "../../contexts/ThemeContext";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { getCommonStyles } from "../../misc/common-styles";
import Spacer from "../../components/Spacer";
import { AuthContext } from "../../contexts/AuthContext";
import { sure } from "../../utils/auth-utils";
import { UpcomingCard } from "../../components/UpcomingCard";
import { ah, capitaliseStart, formatDate } from "../../utils/generic-utils";
import { ScrollView } from "react-native-gesture-handler";
import LaterCard from "../../components/LaterCard";
import ProfileIcon from "../../../assets/profile.svg";
import { TouchableRipple } from "react-native-paper";
import apis from "../../utils/networking/networking";

type Props = StackScreenProps<AuthenticatedSPL, "Home">;

export default function Login(_navProps: Props) {
  let { theme } = React.useContext(ThemeContext);
  const { authInfo, setAuthInfo } = React.useContext(sure(AuthContext));

  const styles = getCommonStyles(theme);

  type task = {
    id: string;
    tag: string;
    title: string;
    time: string;
    day: string;
  };

  const [refreshes, setRefreshes] = useState(0);
  const [taskArr, setTaskArr] = useState<task[]>([]);

  useEffect(() => {
    const fun = async () => {
      const tasks = await apis.tasks.list({});
      if (tasks.status != "success")
        return Alert.alert(tasks.status, tasks.message);

      let newTaskArr: task[] = [];

      for (const task of tasks.tasks) {
        const date = new Date(task.datetime);

        newTaskArr.push({
          id: task._id,
          tag: task.tags[0] ?? "personal",
          title: task.title,
          time: formatDate(new Date(task.datetime)),
          day: `${ah(date.getDay().toString())}/${ah(
            date.getMonth().toString()
          )}`,
        });
      }

      setTaskArr(newTaskArr);
    };
    fun();
  }, [refreshes]);

  const ls = StyleSheet.create({
    sectionHeader: {
      fontFamily: "Inter-Medium",
      letterSpacing: 1.6,
      paddingHorizontal: 26,
      color: "#fbfbfb",
    },
  });

  return (
    <View style={styles.root}>
      <Spacer height={30} />

      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        {/* Header */}
        <View style={{ paddingHorizontal: 25 }}>
          <Pressable onPress={() => setRefreshes(refreshes + 1)}>
            <Text style={{ ...styles.textBold, fontSize: 28 }}>
              Hi {capitaliseStart(authInfo.username)}!
            </Text>
          </Pressable>
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
            task="Default Card"
          />

          {taskArr.map((task) => (
            <UpcomingCard
              key={task.id}
              tag={task.tag}
              time={task.time}
              date={task.day}
              task={task.title}
            />
          ))}
        </ScrollView>
      </View>

      <Spacer height={30} />

      {/* Later this month */}
      <View style={{ flexShrink: 1 }}>
        <Text style={ls.sectionHeader}>LATER THIS MONTH</Text>

        <Spacer height={12} />

        <ScrollView showsVerticalScrollIndicator={false}>
          <LaterCard
            tag="work"
            task="Add tasks to see them here"
            date="Today"
            time="15:45"
          />

          {taskArr.map((task) => (
            <LaterCard
              key={task.id}
              tag={task.tag}
              time={task.time}
              date={task.day}
              task={task.title}
              onSkip={async () => {
                const resp = await apis.tasks.delete({ id: task.id });
                Alert.alert(resp.status, resp.message);
                if (resp.status == "success") setRefreshes(refreshes + 1);
              }}
            />
          ))}
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
          _navProps.navigation.navigate("CreateTask");
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
