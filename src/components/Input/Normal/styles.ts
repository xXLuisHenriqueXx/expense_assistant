import styled from "styled-components/native";

import { ThemeType } from "@src/stores/ThemeStore";

interface ITheme {
  theme: ThemeType;
}

export const Container = styled.View`
  flex-direction: column;
  row-gap: 8px;
  width: 100%;
`;

export const Label = styled.Text`
  padding: 0 8px;
  font-size: 14px;
  font-family: ${({ theme }: ITheme) => theme.fonts.interMedium};
  color: ${({ theme }: ITheme) => theme.colors.primary50};
`;

export const Input = styled.TextInput.attrs({
  placeholderTextColor: ({ theme }: ITheme) => theme.colors.primary25,
})`
  width: 100%;
  height: 64px;
  padding: 0 16px;
  border: 0.75px solid ${({ theme }: ITheme) => theme.colors.primary50};
  border-radius: ${({ theme }: ITheme) => theme.borderRadius.default}px;
  font-size: 16px;
  color: ${({ theme }: ITheme) => theme.colors.primary};
`;
