import { PressableProps } from "react-native";
import styled from "styled-components/native";

import { ThemeType } from "@src/stores/ThemeStore";

interface ITheme {
  theme: ThemeType;
}

type IPressableProps = PressableProps &
  ITheme & {
    rippleColor?: string;
    disabled?: boolean;
    borderRadius?: number;
  };

export const Container = styled.Pressable.attrs<IPressableProps>(
  (props: IPressableProps) => ({
    android_ripple: {
      color: props.rippleColor || props.theme.colors.highlight25,
      borderless: false,
      foreground: true,
    },
  })
)<IPressableProps>`
  opacity: ${(props: IPressableProps) => (props.disabled ? 0.5 : 1)};
  border-radius: ${(props: IPressableProps) =>
    props.borderRadius || props.theme.borderRadius.default}px;
  overflow: hidden;
`;
