import React from "react";

import { StackScreenProps } from "@react-navigation/stack";
import { ThemeContext } from "../utils/ThemeContext";
import { View, StyleSheet } from "react-native";
import { getCommonStyles } from "../utils/CommonStyles";
import { Text } from "react-native";
import { TextInput } from "react-native-paper";
import Spacer from "../components/Spacer";
import Button from "../components/Button";

type Props = StackScreenProps<StackParamList, "Home">;

export default function Home(_navProps: Props) {
  let { theme } = React.useContext(ThemeContext);

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const ls = StyleSheet.create({
    header: {
      fontFamily: "Inter-Bold",
      fontWeight: "700",
      fontSize: 48,
      color: "white",
      alignSelf: "center",
      marginTop: 52,
      letterSpacing: -1.6,
      lineHeight: 58,
    },
  });

  const styles = getCommonStyles(theme);

  return (
    <View style={styles.root}>
      <Text style={ls.header}>taskr</Text>
      <View style={{ flexGrow: 1 }} />
      <View style={{ marginHorizontal: 30, marginBottom: 30 }}>
        <TextInput
          value={username}
          mode="outlined"
          outlineColor="#4F5860"
          underlineColor="#4F5860"
          label="Username"
          style={{ backgroundColor: theme.bg }}
          onChangeText={(text) => setUsername(text)}
        />

        <Spacer height={10} />

        <TextInput
          value={password}
          mode="outlined"
          outlineColor="#4F5860"
          underlineColor="#4F5860"
          label="Password"
          textContentType="password"
          style={{ backgroundColor: theme.bg }}
          onChangeText={(text) => setPassword(text)}
        />

        <Spacer height={14} />

        <Button text="Sign In" />
      </View>
    </View>
  );
}
