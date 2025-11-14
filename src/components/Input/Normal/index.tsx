import { forwardRef, useMemo } from "react";
import { TextInputProps } from "react-native";
import { Container, Input, Label } from "./styles";

import { WIDTH } from "@src/constants/Values";

type INormalProps = TextInputProps & {
  label: string;
  width?: number;
};

const Normal = forwardRef(({ label, width, ...rest }: INormalProps, ref) => {
  const containerWidth = useMemo(() => {
    return width ? width : WIDTH;
  }, [width]);

  return (
    <Container width={containerWidth}>
      <Label>{label}</Label>
      <Input ref={ref} {...rest} />
    </Container>
  );
});

export default Normal;
