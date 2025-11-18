import { ReactNode } from "react";
import { Container } from "./styles";

interface IContainerMainProps {
  children: ReactNode;
}

const ContainerMain = ({ children }: IContainerMainProps) => {
  return <Container>{children}</Container>;
};

export default ContainerMain;
