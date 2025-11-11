import styled from "styled-components/native";
import { ThemeType } from "@src/stores/ThemeStore";

interface ITheme {
  theme: ThemeType;
}

export const Container = styled.View`
  flex-direction: column;
  align-items: start;
  width: 100%;
  padding: 0 24px;
  margin-top: 48px;
`;

export const Title = styled.Text`
  font-size: 24px;
  font-family: ${({ theme }: ITheme) => theme.fonts.interBold};
  color: ${({ theme }: ITheme) => theme.colors.primary};
`;

export const Subtitle = styled.Text`
  font-size: 14px;
  font-family: ${({ theme }: ITheme) => theme.fonts.interMedium};
  color: ${({ theme }: ITheme) => theme.colors.primary75};
`;
