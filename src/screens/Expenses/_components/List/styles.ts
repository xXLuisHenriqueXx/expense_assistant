import { ThemeType } from "@src/stores/ThemeStore";
import styled from "styled-components/native";

export const ContainerNotFound = styled.View`
  flex: 1;
  align-items: center;
  row-gap: 8px;
  padding-top: 50%;
`;

export const Title = styled.Text`
  font-size: 36px;
  font-family: ${({ theme }: { theme: ThemeType }) => theme.fonts.interBold};
  color: ${({ theme }: { theme: ThemeType }) => theme.colors.highlight};
  text-align: center;
`;

export const Subtitle = styled.Text`
  font-size: 16px;
  font-family: ${({ theme }: { theme: ThemeType }) => theme.fonts.interRegular};
  color: ${({ theme }: { theme: ThemeType }) => theme.colors.textPrimary};
  text-align: center;
`;

export const RefreshButton = styled.TouchableOpacity.attrs({
  activeOpacity: 0.75,
})`
  border: 2px solid
    ${({ theme }: { theme: ThemeType }) => theme.colors.highlight};
  border-radius: ${({ theme }: { theme: ThemeType }) =>
    theme.borderRadius.default}px;
  padding: 8px 16px;
  margin-top: 16px;
`;

export const RefreshButtonText = styled.Text`
  font-size: 20px;
  font-family: ${({ theme }: { theme: ThemeType }) => theme.fonts.interMedium};
  color: ${({ theme }: { theme: ThemeType }) => theme.colors.highlight};
  text-align: center;
`;
