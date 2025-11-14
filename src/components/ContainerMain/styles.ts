import styled from "styled-components/native";

import { ThemeType } from "@src/stores/ThemeStore";
import { STATUS_BAR_HEIGHT } from "@src/constants/Values";

interface ITheme {
  theme: ThemeType;
}

interface IContainerProps {
  rowGap: number;
}

export const Container = styled.ScrollView.attrs<IContainerProps>(
  (props: IContainerProps) => ({
    contentContainerStyle: {
      flex: 1,
      alignItems: "center",
      rowGap: props.rowGap,
    },
  })
)<IContainerProps>`
  position: relative;
  flex: 1;
  padding-top: ${STATUS_BAR_HEIGHT + 64}px;
  background-color: ${({ theme }: ITheme) => theme.colors.secondary};
`;
