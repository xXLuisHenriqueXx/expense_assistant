import styled from "styled-components/native";
import Constants from "expo-constants";
import { BlurView } from "expo-blur";

const statusBarHeight = Constants.statusBarHeight;

export const Container = styled.ImageBackground`
  position: relative;
  flex: 1;
  flex-direction: column;
  align-items: center;
  padding-top: ${statusBarHeight}px;
`;

export const ContainerOverlay = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(11, 11, 13, 0.9);
`;

export const Blur = styled(BlurView).attrs({
  tint: "dark",
  intensity: 95,
})`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;
