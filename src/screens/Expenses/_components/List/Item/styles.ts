import { ThemeType } from "@src/stores/ThemeStore";
import styled from "styled-components/native";

export const Container = styled.TouchableOpacity.attrs({
  activeOpacity: "0.85",
})`
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  row-gap: 16px;
  height: 214px;
  padding: 16px;
  background-color: ${({ theme }: { theme: ThemeType }) =>
    theme.colors.tertiary};
  border-radius: ${({ theme }: { theme: ThemeType }) =>
    theme.borderRadius.default}px;
`;

export const Title = styled.Text`
  font-size: 14px;
  font-family: ${({ theme }: { theme: ThemeType }) => theme.fonts.interBold};
  color: ${({ theme }: { theme: ThemeType }) => theme.colors.highlight};
  text-align: center;
  width: 100%;
`;

export const Description = styled.Text`
  font-size: 10px;
  font-family: ${({ theme }: { theme: ThemeType }) => theme.fonts.interMedium};
  color: ${({ theme }: { theme: ThemeType }) => theme.colors.primary};
  text-align: center;
  width: 100%;
`;

export const TagsValueDateContainer = styled.View`
  width: 100%;
  flex-direction: column;
  align-items: center;
`;

export const TagsContainer = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

export const Line = styled.View`
  width: 100%;
  height: 1px;
  background-color: ${({ theme }: { theme: ThemeType }) =>
    theme.colors.primary};
  margin: 8px 0;
`;

export const Tag = styled.Text`
  font-size: 10px;
  font-family: ${({ theme }: { theme: ThemeType }) => theme.fonts.interBold};
  border-radius: ${({ theme }: { theme: ThemeType }) =>
    theme.borderRadius.default}px;
`;

export const ValueDateContainer = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const ValueDateSingleContainer = styled.View`
  flex-direction: column;
  align-items: center;
`;

export const ValueDateTitle = styled.Text`
  font-size: 12px;
  font-family: ${({ theme }: { theme: ThemeType }) => theme.fonts.interBold};
  color: ${({ theme }: { theme: ThemeType }) => theme.colors.highlight};
`;

export const ValueDateText = styled(ValueDateTitle)`
  color: ${({ theme }: { theme: ThemeType }) => theme.colors.primary};
`;
