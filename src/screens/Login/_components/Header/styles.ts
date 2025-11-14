import styled from "styled-components/native";
import { MotiView } from "moti";

import { ThemeType } from "@src/stores/ThemeStore";

interface ITheme {
  theme: ThemeType;
}

export const Container = styled(MotiView)`
  flex-direction: column;
  align-items: center;
  justify-content: center;
  row-gap: 4px;
  width: 100%;
  padding: 0 24px;
`;

export const Title = styled.Text`
  font-size: 28px;
  font-family: ${({ theme }: ITheme) => theme.fonts.interBold};
  color: ${({ theme }: ITheme) => theme.colors.primary};
  text-align: center;
`;

export const Subtitle = styled.Text`
  width: 80%;
  font-size: 14px;
  font-family: ${({ theme }: ITheme) => theme.fonts.interRegular};
  color: ${({ theme }: ITheme) => theme.colors.primary50};
  text-align: center;
`;
