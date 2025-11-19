import styled from "styled-components/native";
import { ThemeType } from "@src/stores/ThemeStore";

interface ITheme {
  theme: ThemeType;
}

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const Title = styled.Text`
  font-size: ${({ theme }: ITheme) => theme.typography.sm}px;
  font-family: ${({ theme }: ITheme) => theme.fonts.interMedium};
  color: ${({ theme }: ITheme) => theme.colors.primary75};
`;

export const CloseButton = styled.TouchableOpacity.attrs({
  activeOpacity: 0.85,
})`
  padding: ${({ theme }: ITheme) => theme.padding.md}px;
  background-color: ${({ theme }: ITheme) => theme.colors.primary25};
  border-radius: ${({ theme }: ITheme) => theme.borderRadius.xl}px;
`;
