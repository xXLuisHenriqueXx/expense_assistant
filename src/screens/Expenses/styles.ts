import styled from "styled-components/native";
import { ThemeType } from "@src/stores/ThemeStore";

export const Container = styled.View`
  flex: 1;
  padding: 0 16px;
  background-color: ${({ theme }: { theme: ThemeType }) =>
    theme.colors.secondary};
`;
