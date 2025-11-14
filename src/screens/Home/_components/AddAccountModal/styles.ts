import { KeyboardAvoidingView } from "react-native";
import styled from "styled-components/native";
import { MotiView } from "moti";
import MaskInput from "react-native-mask-input";

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

export const ContainerHeader = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const Title = styled.Text`
  font-size: 16px;
  font-family: ${({ theme }: ITheme) => theme.fonts.interMedium};
  color: ${({ theme }: ITheme) => theme.colors.primary};
`;

export const CloseButton = styled.TouchableOpacity.attrs({
  activeOpacity: 0.85,
})`
  padding: 12px;
  background-color: ${({ theme }: ITheme) => theme.colors.primary10};
  border-radius: 32px;
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

export const ContainerInput = styled.View`
  position: relative;
  width: 100%;
  height: 56px;
  padding: 0 16px;
  border: 1.5px solid ${({ theme }: ITheme) => theme.colors.primary50};
  border-radius: 16px;
`;

export const Label = styled.Text`
  position: absolute;
  top: -12px;
  left: 16px;
  background-color: ${({ theme }: ITheme) => theme.colors.secondary};
  padding: 0 8px;
  font-size: 14px;
  font-weight: 700;
  color: ${({ theme }: ITheme) => theme.colors.primary50};
`;

export const Input = styled(MaskInput)`
  flex: 1;
  font-size: 16px;
  color: ${({ theme }: ITheme) => theme.colors.primary};
`;

export const ButtonCreate = styled.TouchableOpacity.attrs({
  activeOpacity: 0.85,
})`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 56px;
  padding: 0 16px;
  background-color: ${({ theme }: ITheme) => theme.colors.highlight};
  border-radius: 16px;
`;

export const TextCreate = styled.Text`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }: ITheme) => theme.colors.primary};
`;
