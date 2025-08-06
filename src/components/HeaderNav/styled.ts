import { ThemeType } from "@src/stores/ThemeStore";
import styled from "styled-components/native";

interface NavButtonProps {
  isActive: boolean;
}

export const Container = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  column-gap: 16px;
  padding: 50px 0 40px 0;
`;

export const NavButton = styled.TouchableOpacity.attrs({
  activeOpacity: 0.75,
})<NavButtonProps>`
  position: relative;
  flex: 1;
  height: 40px;
  justify-content: center;
  align-items: center;
  border-radius: ${({ theme }: { theme: ThemeType }) =>
    theme.borderRadius.default}px;
  background-color: ${({
    isActive,
    theme,
  }: {
    isActive: boolean;
    theme: ThemeType;
  }) => (isActive ? theme.colors.highlight : theme.colors.textSecondary)};
`;

export const NavButtonText = styled.Text<NavButtonProps>`
  font-family: ${({ theme }: { theme: ThemeType }) =>
    theme.fonts.interExtraBold};
  font-size: 12px;
  color: ${({ isActive, theme }: { isActive: boolean; theme: ThemeType }) =>
    isActive ? theme.colors.textSecondary : theme.colors.highlight};
  text-transform: uppercase;
`;
