import { ReactNode } from "react";
import { Blur, Container, ContainerOverlay } from "./styles";

interface IContainerMainProps {
  children: ReactNode;
  rowGap: number;
}

const ContainerMain = ({ children, rowGap }: IContainerMainProps) => {
  return (
    <Container
      style={{ rowGap }}
      source={require("@assets/purple_background.jpg")}
      resizeMode="cover"
    >
      <Blur />
      <ContainerOverlay />

      {children}
    </Container>
  );
};

export default ContainerMain;
