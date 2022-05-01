import React from "react";

import { StackScreenProps } from "@react-navigation/stack";
import { ThemeContext } from "../contexts/ThemeContext";
import { Text, View } from "react-native";
import { getCommonStyles } from "../utils/CommonStyles";
import MMKVStorage, { useMMKVStorage } from "react-native-mmkv-storage";
import Button from "../components/Button";
import Spacer from "../components/Spacer";

type Props = StackScreenProps<AuthenticatedSPL, "Home">;
const storage = new MMKVStorage.Loader().initialize();

export default function Login(_navProps: Props) {
  let { theme } = React.useContext(ThemeContext);
  const styles = getCommonStyles(theme);

  const [sUsername, setsUsername] = useMMKVStorage(
    "username",
    storage,
    undefined
  );

  return (
    <View style={{ ...styles.root, marginHorizontal: 15 }}>
      <Spacer height={30} />
      <Text
        style={{ ...styles.text, fontSize: 30, fontFamily: "Inter-Medium" }}
      >
        Hi {sUsername as string}!
      </Text>
      <Spacer height={30} />
      <Button
        text="Log Out"
        onClick={async () => {
          setsUsername(undefined);
          _navProps.navigation.pop();
        }}
      />
    </View>
  );
}
