import React from "react";

import { StackScreenProps } from "@react-navigation/stack";
import { ThemeContext } from "../../contexts/ThemeContext";
import { Text, View } from "react-native";
import { getCommonStyles } from "../../misc/common-styles";
import Button from "../../components/Button";
import Spacer from "../../components/Spacer";
import { AuthContext } from "../../contexts/AuthContext";
import { sure } from "../../utils/auth-utils";
import { UpcomingCard } from "../../components/UpcomingCard";
import { capitaliseStart } from "../../utils/generic-utils";

type Props = StackScreenProps<AuthenticatedSPL, "Home">;

export default function Login(_navProps: Props) {
  let { theme } = React.useContext(ThemeContext);
  const { authInfo, setAuthInfo } = React.useContext(sure(AuthContext));

  const styles = getCommonStyles(theme);

  return (
    <View style={{ ...styles.root, paddingHorizontal: 25 }}>
      <Spacer height={30} />

      {/* Header */}
      <View>
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

      <Spacer height={30} />

      {/* Task list */}
      <View style={{ paddingHorizontal: 5 }}>
        <Text style={{ fontFamily: "Fira-Code", letterSpacing: 1.6 }}>
          UPCOMING TASKS
        </Text>

        <Spacer height={12} />

        <UpcomingCard />
      </View>

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
