import styled from "styled-components/native";
import { ThemeType } from "@src/stores/ThemeStore";

interface ITheme {
  theme: ThemeType;
}

interface IContainerBarSectionProps {
  width: number;
  color: string;
}

interface ILegendIconProps {
  color: string;
}

export const Container = styled.View`
  flex-direction: column;
  row-gap: 8px;
  width: 100%;
  padding: 0 24px;
`;

export const ContainerBar = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 16px;
  background-color: ${({ theme }: ITheme) => theme.colors.primary25};
  border-radius: ${({ theme }: ITheme) => theme.borderRadius.default}px;
  overflow: hidden;
`;

export const ContainerBarSection = styled.View<IContainerBarSectionProps>`
  width: ${(props: IContainerBarSectionProps) => props.width}%;
  height: 16px;
  background-color: ${(props: IContainerBarSectionProps) => props.color};
`;

export const ContainerLegendList = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  width: 100%;
`;

export const ContainerLegendItem = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 4px;
`;

export const LegendIcon = styled.View<ILegendIconProps>`
  width: 12px;
  height: 12px;
  border-radius: ${({ theme }: ITheme) => theme.borderRadius.default}px;
  background-color: ${(props: ILegendIconProps) => props.color};
`;

export const Title = styled.Text`
  font-size: 14px;
  font-family: ${({ theme }: ITheme) => theme.fonts.interMedium};
  color: ${({ theme }: ITheme) => theme.colors.primary75};
`;

export const BalanceText = styled.Text`
  font-size: 24px;
  font-family: ${({ theme }: ITheme) => theme.fonts.interBold};
  color: ${({ theme }: ITheme) => theme.colors.primary};
`;

export const LegendText = styled.Text`
  font-size: 10px;
  font-family: ${({ theme }: ITheme) => theme.fonts.interRegular};
  color: ${({ theme }: ITheme) => theme.colors.primary75};
`;
