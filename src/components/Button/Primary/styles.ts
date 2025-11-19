import styled from "styled-components/native";

import { ThemeType } from "@src/stores/ThemeStore";

interface ITheme {
  theme: ThemeType;
}

export const Button = styled.Pressable.attrs<ITheme>((props: ITheme) => ({
  android_ripple: {
    color: props.theme.colors.tertiary,
    borderless: false,
    foreground: true,
  },
}))`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 64px;
  background-color: ${({ theme }: ITheme) => theme.colors.highlight};
  border-radius: ${({ theme }: ITheme) => theme.borderRadius.xl}px;
  overflow: hidden;
`;

export const Text = styled.Text`
  font-size: ${({ theme }: ITheme) => theme.typography.sm}px;
  font-family: ${({ theme }: ITheme) => theme.fonts.interMedium};
  color: ${({ theme }: ITheme) => theme.colors.primary};
`;
