import { ReactNode } from "react";
import { Container } from "./styles";

interface IContainerMainProps {
  children: ReactNode;
  rowGap?: number;
}

const ContainerMain = ({ children, rowGap = 0 }: IContainerMainProps) => {
  return <Container rowGap={rowGap}>{children}</Container>;
};

export default ContainerMain;
