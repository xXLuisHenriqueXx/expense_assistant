import { forwardRef, useMemo } from "react";
import { TextInputProps } from "react-native";
import { Container, Input, Label } from "./styles";

import { WIDTH } from "@src/constants/Values";
import { useThemeStore } from "@src/stores/ThemeStore";

type INormalProps = TextInputProps & {
  label: string;
  width?: number;
};

const Normal = forwardRef(({ label, width, ...rest }: INormalProps, ref) => {
  const { theme } = useThemeStore();

  const containerWidth = useMemo(() => {
    return width ? width : WIDTH;
  }, [width]);

  return (
    <Container width={containerWidth}>
      <Label>{label}</Label>
      <Input
        ref={ref}
        placeholderTextColor={theme.colors.primary25}
        {...rest}
      />
    </Container>
  );
});

export default Normal;
