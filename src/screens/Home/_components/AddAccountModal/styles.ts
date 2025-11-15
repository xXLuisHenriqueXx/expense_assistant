import { KeyboardAvoidingView } from "react-native";
import styled from "styled-components/native";
import { MotiView } from "moti";

import { ThemeType } from "@src/stores/ThemeStore";

interface ITheme {
  theme: ThemeType;
}

interface IStyle extends ITheme {
  active: boolean;
}

export const Container = styled(MotiView).attrs({
  from: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { type: "timing", duration: 300 },
})`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  flex-direction: column;
  align-items: center;
  justify-content: end;
  background-color: rgba(11, 11, 13, 0.9);
`;

export const ContainerAvoid = styled(KeyboardAvoidingView).attrs({
  behavior: "height",
})`
  width: 100%;
  height: 100%;
  z-index: 10;
`;

export const ContainerModal = styled(MotiView).attrs({
  from: { translateY: 120 },
  animate: { translateY: 0 },
  exit: { translateY: 120 },
  transition: { type: "timing", duration: 300 },
})`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  row-gap: 32px;
  padding: 24px;
  padding-bottom: 48px;
  background-color: ${({ theme }: ITheme) => theme.colors.secondary};
  border-radius: 16px;
`;

export const ContainerCard = styled.View`
  flex-direction: column;
  align-items: center;
  row-gap: 8px;
  width: 100%;
`;

export const DotsContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  column-gap: 4px;
`;

export const Dot = styled.View<IStyle>`
  width: ${({ active }: IStyle) => (active ? 16 : 6)}px;
  height: 6px;
  border-radius: 6px;
  background-color: ${({ active, theme }: IStyle) =>
    active ? theme.colors.primary : theme.colors.primary25};
`;
