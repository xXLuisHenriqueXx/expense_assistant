import styled from "styled-components/native";
import { ThemeType } from "@src/stores/ThemeStore";

interface ITheme {
  theme: ThemeType;
}

export const Container = styled.View`
  flex-direction: column;
  align-items: start;
  width: 100%;
  padding: 0 ${({ theme }: ITheme) => theme.padding.xl}px;
  padding-top: ${({ theme }: ITheme) => theme.padding.xxl}px;
`;

export const Title = styled.Text`
  font-size: ${({ theme }: ITheme) => theme.typography.lg}px;
  font-family: ${({ theme }: ITheme) => theme.fonts.interBold};
  color: ${({ theme }: ITheme) => theme.colors.primary};
`;

export const Subtitle = styled.Text`
  font-size: ${({ theme }: ITheme) => theme.typography.xs}px;
  font-family: ${({ theme }: ITheme) => theme.fonts.interMedium};
  color: ${({ theme }: ITheme) => theme.colors.primary75};
`;
