import { ReactNode } from "react";
import { Container } from "./styles";

import { useThemeStore } from "@src/stores/ThemeStore";

interface IPressableProps {
  children: ReactNode;
  rippleColor?: string;
  onPress: () => void;
  disabled?: boolean;
  borderRadius?: number;
}

const PressableButton = ({
  children,
  rippleColor,
  onPress,
  disabled,
  borderRadius,
}: IPressableProps) => {
  const { theme } = useThemeStore();

  return (
    <Container
      rippleColor={rippleColor || theme.colors.highlight25}
      disabled={disabled}
      borderRadius={borderRadius}
      onPress={onPress}
    >
      {children}
    </Container>
  );
};

export default PressableButton;
