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
  row-gap: ${({ theme }: ITheme) => theme.gap.sm}px;
  width: 100%;
  padding: 0 ${({ theme }: ITheme) => theme.padding.xl}px;
  padding-top: ${({ theme }: ITheme) => theme.gap.xxl}px;
`;

export const Title = styled.Text`
  font-size: ${({ theme }: ITheme) => theme.typography.xxxl}px;
  font-family: ${({ theme }: ITheme) => theme.fonts.interBold};
  color: ${({ theme }: ITheme) => theme.colors.primary};
  text-align: center;
`;

export const Subtitle = styled.Text`
  width: 80%;
  font-size: ${({ theme }: ITheme) => theme.typography.sm}px;
  font-family: ${({ theme }: ITheme) => theme.fonts.interRegular};
  color: ${({ theme }: ITheme) => theme.colors.primary75};
  text-align: center;
`;
