import React, { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import Spacer from "../../components/Spacer";
import { ThemeContext } from "../../contexts/ThemeContext";
import { getCommonStyles } from "../../misc/common-styles";
import BackArrow from "../../../assets/back-arrow.svg";
import OutlineInput from "../../components/OutlineInput";
import Tag from "../../components/Tag";
import { Text } from "react-native-paper";
import { StackScreenProps } from "@react-navigation/stack";
import { tagColors } from "../../utils/constants";

type Props = StackScreenProps<AuthenticatedSPL, "CreateTask">;

export function CreateTask(_navProps: Props) {
  let { theme } = React.useContext(ThemeContext);

  const styles = getCommonStyles(theme);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [selectedTag, setSelectedTag] = useState("Personal");

  const ls = StyleSheet.create({
    headerTitle: {
      ...styles.textBold,
      fontSize: 27,
    },
    headerSubtitle: {
      fontFamily: "Inter-Medium",
      color: "#777D81",
      fontSize: 19,
      fontWeight: "500",
    },
    mainBody: {
      marginHorizontal: 30,
    },
    bottomTextCommon: {
      flex: 1,
      height: 60,
      justifyContent: "center",
      alignItems: "center",
    },
  });

  return (
    <View style={styles.root}>
      <Spacer height={30} />

      {/* Horizontal flex for header icon and text */}
      <View style={{ flexDirection: "row", paddingHorizontal: 25 }}>
        {/* Header icon */}
        <Pressable onPress={() => _navProps.navigation.pop()}>
          <BackArrow style={{ marginTop: 13 }} />
        </Pressable>

        <Spacer width={20} />

        {/* Header text */}
        <View>
          <Text style={ls.headerTitle}>Create task</Text>
          <Text style={ls.headerSubtitle}>Let's get it started</Text>
        </View>
      </View>

      <Spacer height={15} />

      {/* Main body */}
      <View style={ls.mainBody}>
        {/* Title */}
        <OutlineInput
          label="Task Title"
          value={title}
          onChangeText={(text) => setTitle(text)}
          theme={theme}
        />

        <Spacer height={12} />

        {/* Description */}
        <OutlineInput
          label="Description"
          value={description}
          onChangeText={(text) => setDescription(text)}
          theme={theme}
          height={200}
          multiline
        />

        {/* Tag */}
        <Spacer height={20} />
        <Text style={{ fontSize: 18 }}>Tag</Text>
        <Spacer height={8} />
        <View style={{ flexDirection: "row" }}>
          <Tag
            text="Personal"
            selectedTag={selectedTag}
            color={tagColors.personal}
            onPress={(tag) => setSelectedTag(tag)}
          />
          <Spacer width={8} />
          <Tag
            text="Work"
            selectedTag={selectedTag}
            color={tagColors.work}
            onPress={(tag) => setSelectedTag(tag)}
          />
        </View>
      </View>

      {/* Bottom menu */}
      <View style={{ flexGrow: 1 }} />
      <View style={{ flexDirection: "row", width: "100%" }}>
        <View style={{ ...ls.bottomTextCommon, backgroundColor: "#5F7180" }}>
          <Text style={{ fontWeight: "bold", fontSize: 17, color: "#ffffff" }}>
            Save
          </Text>
        </View>
        <View style={{ ...ls.bottomTextCommon, backgroundColor: "#313B43" }}>
          <Text style={{ fontSize: 17, color: "#ffffff" }}>Cancel</Text>
        </View>
      </View>
    </View>
  );
}
