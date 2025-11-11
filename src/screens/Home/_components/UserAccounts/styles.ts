import styled from "styled-components/native";

import { ThemeType } from "@src/stores/ThemeStore";
import PagerView, { PagerViewProps } from "react-native-pager-view";

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
  row-gap: 16px;
  width: 100%;
  padding: 0 24px;
`;

export const ContainerScroll = styled(PagerView)<IContainerScrollProps>`
  width: ${(props: IContainerScrollProps) => props.width}px;
  height: ${(props: IContainerScrollProps) => props.height}px;
`;

export const Title = styled.Text`
  font-size: 16px;
  font-family: ${({ theme }: ITheme) => theme.fonts.interMedium};
  color: ${({ theme }: ITheme) => theme.colors.primary};
`;
