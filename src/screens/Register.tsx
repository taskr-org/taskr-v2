import React from "react";

import { StackScreenProps } from "@react-navigation/stack";
import { ThemeContext } from "../contexts/ThemeContext";
import { View, StyleSheet } from "react-native";
import { getCommonStyles } from "../misc/common-styles";
import { Text } from "react-native";
import { TextInput } from "react-native-paper";
import Spacer from "../components/Spacer";
import Button from "../components/Button";
import OutlinedButton from "../components/OutlinedButton";
import apis from "../utils/networking/networking";
import OutlineInput from "../components/OutlineInput";

type Props = StackScreenProps<UnauthenticatedSPL, "Register">;

export default function Register(_navProps: Props) {
  let { theme } = React.useContext(ThemeContext);

  const [fullname, setFullName] = React.useState("");
  const [email, setEmail] = React.useState("");
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
    termscons: {
      alignSelf: "flex-end",
      fontFamily: "Inter-Medium",
      color: "#444E56",
      fontSize: 10,
      textAlign: "right",
    },
  });

  const styles = getCommonStyles(theme);

  return (
    <View style={styles.root}>
      <Text style={ls.header}>taskr</Text>
      <View style={{ flexGrow: 1 }} />
      <View style={{ marginHorizontal: 30, marginBottom: 30 }}>
        <OutlineInput
          label="Full Name"
          value={fullname}
          onChangeText={(text) => setFullName(text)}
          theme={theme}
          isPassword={false}
        />

        <Spacer height={10} />

        <OutlineInput
          label="Email Address"
          value={email}
          onChangeText={(text) => setEmail(text)}
          theme={theme}
          isPassword={false}
        />

        <Spacer height={10} />

        <OutlineInput
          label="Username"
          value={username}
          onChangeText={(text) => setUsername(text)}
          theme={theme}
          isPassword={false}
        />

        <Spacer height={10} />

        <OutlineInput
          label="Password"
          value={password}
          isPassword
          onChangeText={(text) => setPassword(text)}
          theme={theme}
        />

        <Spacer height={14} />

        <Button
          text="Create an account"
          onClick={async () => {
            await apis.register({
              fullname,
              username,
              password,
              email,
            });
          }}
        />

        <Spacer height={12} />

        <Text style={ls.termscons}>
          By creating an account,
          {"\n"}
          you accept the terms and conditions
        </Text>

        <Spacer height={36} />

        <OutlinedButton
          text="Already have an account?"
          theme={theme}
          onClick={() => _navProps.navigation.pop()}
        />
      </View>
    </View>
  );
}
