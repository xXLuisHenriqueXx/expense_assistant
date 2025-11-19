import styled from "styled-components/native";
import { MotiView } from "moti";

import { ThemeType } from "@src/stores/ThemeStore";

interface ITheme {
  theme: ThemeType;
}

export const Form = styled(MotiView)`
  flex-direction: column;
  align-items: center;
  row-gap: ${({ theme }: ITheme) => theme.gap.xxl}px;
  width: 100%;
  padding: 0 ${({ theme }: ITheme) => theme.padding.xl}px;
`;
