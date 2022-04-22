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
import MMKVStorage, { useMMKVStorage } from "react-native-mmkv-storage";

type Props = StackScreenProps<StackParamList, "Login">;
const storage = new MMKVStorage.Loader().initialize();

export default function Login(_navProps: Props) {
  let { theme } = React.useContext(ThemeContext);

  if (storage.getString("user") != undefined)
    _navProps.navigation.navigate("Home");

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [_, setsUsername] = useMMKVStorage("user", storage, undefined);

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
    forpass: {
      alignSelf: "flex-end",
      fontFamily: "Inter-Medium",
      color: "#6B7B88",
      fontSize: 16,
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
          secureTextEntry={true}
          style={{ backgroundColor: theme.bg }}
          onChangeText={(text) => setPassword(text)}
        />

        <Spacer height={14} />

        <Button
          text="Sign In"
          onClick={async () => {
            const success = await apis.login(username, password, () => {
              if (success) {
                setsUsername(username);
                _navProps.navigation.navigate("Home");
              }
            });
          }}
        />

        <Spacer height={12} />

        <Text style={ls.forpass}>Forgot password?</Text>

        <Spacer height={36} />

        <OutlinedButton
          text="Don't have an account?"
          theme={theme}
          onClick={() => _navProps.navigation.navigate("Register")}
        />
      </View>
    </View>
  );
}
