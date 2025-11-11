import styled from "styled-components/native";
import { ThemeType } from "@src/stores/ThemeStore";

interface ITheme {
  theme: ThemeType;
}

export const Header = styled.View`
  flex-direction: column;
  align-items: start;
  width: 100%;
  padding: 0 24px;
  margin-top: 24px;
`;

export const Title = styled.Text`
  font-size: 24px;
  font-family: ${({ theme }: ITheme) => theme.fonts.interBold};
  color: ${({ theme }: ITheme) => theme.colors.primary};
`;

export const Subtitle = styled.Text`
  width: 80%;
  font-size: 14px;
  font-family: ${({ theme }: ITheme) => theme.fonts.interRegular};
  color: ${({ theme }: ITheme) => theme.colors.primary60};
`;
