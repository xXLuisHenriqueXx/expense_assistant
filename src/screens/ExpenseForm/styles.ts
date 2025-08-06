import { ThemeType } from "@src/stores/ThemeStore";
import styled from "styled-components/native";

interface CategoryProps {
  isSelected: boolean;
}

export const Container = styled.ScrollView`
  flex: 1;
  padding: 0 16px;
  background-color: ${({ theme }: { theme: ThemeType }) =>
    theme.colors.secondary};
`;

export const Title = styled.Text`
  font-size: 20px;
  font-family: ${({ theme }: { theme: ThemeType }) =>
    theme.fonts.interExtraBold};
  color: ${({ theme }: { theme: ThemeType }) => theme.colors.highlight};
  text-transform: uppercase;
  text-align: center;
  margin-top: 80px;
`;

export const Description = styled(Title)`
  font-size: 14px;
  font-family: ${({ theme }: { theme: ThemeType }) => theme.fonts.interBold};
  color: ${({ theme }: { theme: ThemeType }) => theme.colors.primary};
  margin-top: 0;
  margin-bottom: 32px;
`;

export const InputContainer = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 0 8px;
  margin-bottom: 16px;
  border-bottom-width: 2px;
  border-bottom-color: ${({ theme }: { theme: ThemeType }) =>
    theme.colors.highlight};
`;

export const InputContainerDescription = styled(InputContainer)`
  height: 120px;
  align-items: flex-start;
`;

export const Input = styled.TextInput`
  flex: 1;
  padding: 16px 8px;
  font-size: 16px;
  font-family: ${({ theme }: { theme: ThemeType }) => theme.fonts.interMedium};
  color: ${({ theme }: { theme: ThemeType }) => theme.colors.primary};
`;

export const InputValueDate = styled(Input)`
  text-align: center;
`;

export const SeparatorText = styled.Text`
  font-size: 16px;
  font-family: ${({ theme }: { theme: ThemeType }) => theme.fonts.interBold};
  color: ${({ theme }: { theme: ThemeType }) => theme.colors.primary30};
  text-align: center;
  margin: 0 8px;
`;

export const CategoryInputContainer = styled(InputContainer)`
  flex-direction: column;
  padding: 8px;
`;

export const CategoryTitle = styled.Text`
  font-size: 14px;
  font-family: ${({ theme }: { theme: ThemeType }) => theme.fonts.interBold};
  color: ${({ theme }: { theme: ThemeType }) => theme.colors.highlight};
  text-transform: uppercase;
  text-align: center;
  margin-bottom: 16px;
`;

export const CategoriesMapContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  gap: 16px;
`;

export const Category = styled.TouchableOpacity.attrs({
  activeOpacity: 0.75,
})<CategoryProps>`
  flex-basis: 30%;
  align-items: center;
  background-color: ${({
    theme,
    isSelected,
  }: {
    theme: ThemeType;
    isSelected: boolean;
  }) => (isSelected ? theme.colors.primary30 : "transparent")};
  border-radius: ${({ theme }: { theme: ThemeType }) =>
    theme.borderRadius.default}px;
`;

export const CategoryText = styled.Text`
  font-size: 16px;
  font-family: ${({ theme }: { theme: ThemeType }) => theme.fonts.interBold};
  color: ${({ color }: { color: string }) => color};
`;
