import { ViewProps } from "react-native";
import styled from "styled-components/native";

import { ThemeType } from "@src/stores/ThemeStore";

interface ITheme {
  theme: ThemeType;
}

export const Button = styled.View<ViewProps>`
  position: relative;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  row-gap: 8px;
  height: 192px;
  padding: 8px;
  border: 1.5px dashed ${({ theme }: ITheme) => theme.colors.primary75};
  border-radius: ${({ theme }: ITheme) => theme.borderRadius.default}px;
  overflow: hidden;
`;

export const Background = styled.View`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }: ITheme) => theme.colors.primary};
  opacity: 0.15;
  border-radius: 8px;
`;
