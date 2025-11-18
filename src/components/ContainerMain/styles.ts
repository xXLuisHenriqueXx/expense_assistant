import styled from "styled-components/native";

import { ThemeType } from "@src/stores/ThemeStore";
import { STATUS_BAR_HEIGHT } from "@src/constants/Values";

interface ITheme {
  theme: ThemeType;
}

export const Container = styled.ScrollView.attrs({
  contentContainerStyle: {
    flex: 1,
    alignItems: "center",
    rowGap: 32,
  },
})`
  position: relative;
  flex: 1;
  padding-top: ${STATUS_BAR_HEIGHT + 32}px;
  background-color: ${({ theme }: ITheme) => theme.colors.secondary};
`;
