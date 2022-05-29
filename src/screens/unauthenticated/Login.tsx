import React from "react";

import { StackScreenProps } from "@react-navigation/stack";
import { ThemeContext } from "../../contexts/ThemeContext";
import { View, StyleSheet } from "react-native";
import { getCommonStyles } from "../../misc/common-styles";
import { Text } from "react-native";
import Spacer from "../../components/Spacer";
import Button from "../../components/Button";
import OutlinedButton from "../../components/OutlinedButton";
import apis from "../../utils/networking/networking";
import { AuthContext } from "../../contexts/AuthContext";
import OutlineInput from "../../components/OutlineInput";
import Separator from "../../components/Separator";

type Props = StackScreenProps<UnauthenticatedSPL, "Login">;

export default function Login(_navProps: Props) {
  let { theme } = React.useContext(ThemeContext);
  let auth = React.useContext(AuthContext);

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
    subheader: {
      fontFamily: "Inter-Medium",
      color: "#878F97",
      alignSelf: "center",
      letterSpacing: -0.6,
      marginTop: -4,
    },
    forpass: {
      alignSelf: "flex-end",
      fontFamily: "Inter-Medium",
      color: "#878F97",
      fontSize: 16,
    },
    ltya: {
      fontFamily: "Inter-SemiBold",
      fontSize: 17,
      color: "#fbfbfb",
      marginBottom: 5,
      letterSpacing: -0.4,
    },
  });

  const styles = getCommonStyles(theme);

  return (
    <View style={styles.root}>
      {/* Top */}
      <Text style={ls.header}>taskr</Text>
      <Text style={ls.subheader}>let's organise your day.</Text>

      <Separator />

      {/* Bottom */}
      <View style={{ marginHorizontal: 30, marginBottom: 30 }}>
        <Text style={ls.ltya}>👋 Login to your account</Text>
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
          text="Sign In"
          onClick={async () => {
            const resp = await apis.login({ username, password });
            if (resp.status === "success")
              auth.setAuthInfo({
                authenticated: true,
                username,
                token: resp.token,
              });
          }}
        />
        <Spacer height={12} />
        <Text style={ls.forpass}>Having trouble?</Text>
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
