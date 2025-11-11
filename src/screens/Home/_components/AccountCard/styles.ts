import styled from "styled-components/native";
import { LinearGradient } from "expo-linear-gradient";

import { ThemeType } from "@src/stores/ThemeStore";

interface ITheme {
  theme: ThemeType;
}

export const Container = styled(LinearGradient).attrs({
  start: { x: 0, y: 0.5 },
  end: { x: 1, y: 0.5 },
})`
  flex-direction: column;
  align-items: start;
  justify-content: start;
  height: 192px;
  padding: 16px;
  border-radius: ${({ theme }: ITheme) => theme.borderRadius.default}px;
  overflow: hidden;
`;

export const Bubble = styled.View`
  position: absolute;
  top: -56px;
  left: -56px;
  width: 192px;
  height: 192px;
  background-color: ${({ theme }: ITheme) => theme.colors.tertiary};
  opacity: 0.15;
  border-radius: 96px;
`;

export const BubbleBorder = styled.View`
  position: absolute;
  bottom: -82px;
  right: -82px;
  width: 164px;
  height: 164px;
  border: 36px solid ${({ theme }: ITheme) => theme.colors.primary};
  opacity: 0.1;
  border-radius: 82px;
`;

export const ContainerInfo = styled.View`
  flex-direction: row;
  align-items: start;
  justify-content: space-between;
`;

export const ContainerLogo = styled.View`
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  background-color: ${({ theme }: ITheme) => theme.colors.primary50};
  border-radius: 28px;
`;

export const Logo = styled.Image.attrs({
  resizeMode: "contain",
})`
  width: 36px;
  height: 36px;
`;

export const TextName = styled.Text`
  font-size: 16px;
  font-family: ${({ theme }: ITheme) => theme.fonts.interBold};
  color: ${({ theme }: ITheme) => theme.colors.primary};
`;

export const TextCurrency = styled.Text`
  position: absolute;
  bottom: 16px;
  left: 16px;
  font-size: 14px;
  font-family: ${({ theme }: ITheme) => theme.fonts.interBold};
  color: ${({ theme }: ITheme) => theme.colors.primary};
  padding: 4px 8px;
  background-color: ${({ theme }: ITheme) => theme.colors.secondary};
  opacity: 0.85;
  border-radius: 8px;
`;

export const TextBalance = styled.Text`
  position: absolute;
  bottom: 16px;
  right: 16px;
  font-size: 18px;
  font-family: ${({ theme }: ITheme) => theme.fonts.interSemiBold};
  color: ${({ theme }: ITheme) => theme.colors.primary75};
`;
