import styled from "styled-components/native";
import { ThemeType } from "@src/stores/ThemeStore";
import { MotiScrollView, MotiView } from "moti";

interface ITheme {
  theme: ThemeType;
}

export const Header = styled(MotiView)`
  flex-direction: column;
  align-items: center;
  justify-content: center;
  row-gap: 4px;
  width: 100%;
  padding: 0 24px;
  margin-top: 72px;
`;

export const Title = styled.Text`
  font-size: 32px;
  font-weight: 900;
  color: ${({ theme }: ITheme) => theme.colors.primary};
  text-align: center;
`;

export const Subtitle = styled.Text`
  width: 80%;
  font-size: 14px;
  font-weight: 400;
  color: ${({ theme }: ITheme) => theme.colors.primary60};
  text-align: center;
`;

export const Form = styled(MotiScrollView)`
  flex: 1;
  width: 100%;
  padding: 0 24px;
  background-color: ${({ theme }: ITheme) => theme.colors.tertiary};
  border-radius: 0 32px 0 0;
`;

export const ContainerInput = styled.View`
  position: relative;
  width: 100%;
  height: 56px;
  padding: 0 16px;
  border: 1.5px solid ${({ theme }: ITheme) => theme.colors.primary60};
  border-radius: 16px;
`;

export const Label = styled.Text`
  position: absolute;
  top: -12px;
  left: 16px;
  background-color: ${({ theme }: ITheme) => theme.colors.tertiary};
  padding: 0 8px;
  font-size: 14px;
  font-weight: 700;
  color: ${({ theme }: ITheme) => theme.colors.primary60};
`;

export const Input = styled.TextInput`
  flex: 1;
  font-size: 16px;
  color: ${({ theme }: ITheme) => theme.colors.primary};
`;

export const ButtonLogin = styled.TouchableOpacity.attrs({
  activeOpacity: 0.85,
})`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 56px;
  padding: 0 16px;
  background-color: ${({ theme }: ITheme) => theme.colors.highlight};
  border-radius: 16px;
`;

export const TextLogin = styled.Text`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }: ITheme) => theme.colors.primary};
`;
