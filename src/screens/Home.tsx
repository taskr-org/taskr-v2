import React from "react";

import { StackScreenProps } from "@react-navigation/stack";
import { ThemeContext } from "../contexts/ThemeContext";
import { Text, View } from "react-native";
import { getCommonStyles } from "../misc/common-styles";
import { useMMKVStorage } from "react-native-mmkv-storage";
import Button from "../components/Button";
import Spacer from "../components/Spacer";
import { AuthContext } from "../contexts/AuthContext";

type Props = StackScreenProps<AuthenticatedSPL, "Home">;

export default function Login(_navProps: Props) {
  let { theme } = React.useContext(ThemeContext);
  const { authInfo, setAuthInfo } = React.useContext(AuthContext);

  if (authInfo.authenticated == false) return <></>;

  const styles = getCommonStyles(theme);

  return (
    <View style={{ ...styles.root, paddingHorizontal: 15 }}>
      <Spacer height={30} />
      <Text
        style={{ ...styles.text, fontSize: 30, fontFamily: "Inter-Medium" }}
      >
        Hi {authInfo.username} with token {authInfo.token}!
      </Text>
      <Spacer height={30} />
      <Button
        text="Log Out"
        onClick={async () => {
          setAuthInfo({ authenticated: false });
        }}
      />
    </View>
  );
}
