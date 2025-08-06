import { ThemeType } from "@src/stores/ThemeStore";
import styled from "styled-components/native";

interface TagProps {
  borderColor: string;
  backgroundColor: string;
}

export const Title = styled.Text`
  font-size: 16px;
  font-family: ${({ theme }: { theme: ThemeType }) =>
    theme.fonts.interExtraBold};
  color: ${({ theme }: { theme: ThemeType }) => theme.colors.highlight};
  text-transform: uppercase;
  margin: 8px 0;
`;

export const Description = styled.Text`
  font-size: 10px;
  font-family: ${({ theme }: { theme: ThemeType }) => theme.fonts.interBold};
  color: ${({ theme }: { theme: ThemeType }) => theme.colors.textPrimary};
  text-transform: uppercase;
`;

export const TagsValueDateContainer = styled.View`
  position: absolute;
  bottom: 16px;
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
    theme.colors.textPrimary};
  margin: 8px 0;
`;

export const Tag = styled.Text<TagProps>`
  font-size: 10px;
  font-family: ${({ theme }: { theme: ThemeType }) => theme.fonts.interBold};
  color: ${({ borderColor }: { borderColor: string }) => borderColor};
  text-transform: uppercase;
  background-color: ${({ backgroundColor }: { backgroundColor: string }) =>
    backgroundColor};
  padding: 4px;
  border: 1px solid ${({ borderColor }: { borderColor: string }) => borderColor};
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
  color: ${({ theme }: { theme: ThemeType }) => theme.colors.textPrimary};
`;
