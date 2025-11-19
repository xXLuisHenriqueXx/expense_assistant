import styled from "styled-components/native";

import { ThemeType } from "@src/stores/ThemeStore";

interface ITheme {
  theme: ThemeType;
}

export const Container = styled.View`
  flex-direction: column;
  row-gap: ${({ theme }: ITheme) => theme.gap.sm}px;
  width: 100%;
`;

export const Label = styled.Text`
  padding: 0 ${({ theme }: ITheme) => theme.padding.md}px;
  font-size: ${({ theme }: ITheme) => theme.typography.sm}px;
  font-family: ${({ theme }: ITheme) => theme.fonts.interMedium};
  color: ${({ theme }: ITheme) => theme.colors.primary75};
`;

export const Input = styled.TextInput`
  width: 100%;
  height: 64px;
  padding: 0 ${({ theme }: ITheme) => theme.padding.lg}px;
  border: 0.75px solid ${({ theme }: ITheme) => theme.colors.primary75};
  border-radius: ${({ theme }: ITheme) => theme.borderRadius.xl}px;
  font-size: ${({ theme }: ITheme) => theme.typography.md}px;
  color: ${({ theme }: ITheme) => theme.colors.primary};
`;
