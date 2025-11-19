import styled from "styled-components/native";
import PagerView, { PagerViewProps } from "react-native-pager-view";

import { ThemeType } from "@src/stores/ThemeStore";

interface ITheme {
  theme: ThemeType;
}

type IContainerScrollProps = PagerViewProps & {
  width: number;
  height: number;
};

export const Container = styled.View`
  flex-direction: column;
  align-items: start;
  row-gap: ${({ theme }: ITheme) => theme.gap.md}px;
  width: 100%;
  padding: 0 ${({ theme }: ITheme) => theme.padding.xl}px;
`;

export const ContainerScroll = styled(PagerView)<IContainerScrollProps>`
  width: ${(props: IContainerScrollProps) => props.width}px;
  height: ${(props: IContainerScrollProps) => props.height}px;
`;

export const Title = styled.Text`
  font-size: ${({ theme }: ITheme) => theme.typography.sm}px;
  font-family: ${({ theme }: ITheme) => theme.fonts.interMedium};
  color: ${({ theme }: ITheme) => theme.colors.primary75};
`;
