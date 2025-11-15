import { ReactNode } from "react";
import { Container } from "./styles";

import { useThemeStore } from "@src/stores/ThemeStore";

interface IPressablePlaceholderProps {
  children: ReactNode;
  rippleColor?: string;
  onPress: () => void;
  disabled?: boolean;
  borderRadius?: number;
}

const PressablePlaceholder = ({
  children,
  rippleColor,
  onPress,
  disabled,
  borderRadius,
}: IPressablePlaceholderProps) => {
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

export default PressablePlaceholder;
