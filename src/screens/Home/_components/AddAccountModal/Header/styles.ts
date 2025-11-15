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
