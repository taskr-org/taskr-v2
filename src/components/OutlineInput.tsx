import React from "react";
import { TextInput } from "react-native-paper";

type Props = {
  label: string;
  value: string;
  onChangeText?: (text: string) => void;
  theme: AppTheme;
  isPassword?: boolean;
  height?: number;
  multiline?: boolean;
};

export default function OutlineInput(p: Props) {
  return (
    <TextInput
      value={p.value}
      mode="outlined"
      outlineColor={p.theme.accentColor}
      underlineColor={p.theme.accentColor}
      autoCapitalize="none"
      label={p.label}
      secureTextEntry={p.isPassword ?? false}
      multiline={p.multiline ?? false}
      style={{
        backgroundColor: p.theme.bg,
        ...(p.height != undefined ? { height: p.height } : {}),
      }}
      onChangeText={p.onChangeText ?? (() => {})}
    />
  );
}
