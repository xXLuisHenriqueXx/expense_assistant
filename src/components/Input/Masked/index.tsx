import { forwardRef, useMemo } from "react";
import { Container, Input, Label } from "./styles";
import { MaskInputProps } from "react-native-mask-input";

import { WIDTH } from "@src/constants/Values";
import { useThemeStore } from "@src/stores/ThemeStore";

type IMaskedProps = MaskInputProps & {
  label: string;
  width?: number;
};

const Masked = forwardRef(({ label, width, ...rest }: IMaskedProps, ref) => {
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

export default Masked;
