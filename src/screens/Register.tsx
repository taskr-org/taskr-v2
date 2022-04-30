import React from "react";

import { StackScreenProps } from "@react-navigation/stack";
import { ThemeContext } from "../utils/ThemeContext";
import { View, StyleSheet } from "react-native";
import { getCommonStyles } from "../utils/CommonStyles";
import { Text } from "react-native";
import { TextInput } from "react-native-paper";
import Spacer from "../components/Spacer";
import Button from "../components/Button";
import OutlinedButton from "../components/OutlinedButton";
import apis from "../utils/Networking";

type Props = StackScreenProps<StackParamList, "Register">;

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
        <TextInput
          value={fullname}
          mode="outlined"
          outlineColor="#4F5860"
          underlineColor="#4F5860"
          label="Full Name"
          style={{ backgroundColor: theme.bg }}
          onChangeText={(text) => setFullName(text)}
        />

        <Spacer height={10} />

        <TextInput
          value={email}
          mode="outlined"
          outlineColor="#4F5860"
          underlineColor="#4F5860"
          label="Email Address"
          style={{ backgroundColor: theme.bg }}
          onChangeText={(text) => setEmail(text)}
        />

        <Spacer height={10} />

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
          secureTextEntry={true}
          style={{ backgroundColor: theme.bg }}
          onChangeText={(text) => setPassword(text)}
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
