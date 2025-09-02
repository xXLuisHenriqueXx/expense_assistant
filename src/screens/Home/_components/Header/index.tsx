import { memo } from "react";
import { Container, Subtitle, Title } from "./styles";

interface IHeaderProps {
  name: string | undefined;
}

const greetingMessage = () => {
  const hours = new Date().getHours();
  if (hours < 12) return "Bom dia, ";
  if (hours >= 12 && hours < 18) return "Boa tarde, ";
  return "Boa noite, ";
};

const Header = ({ name }: IHeaderProps) => {
  return (
    <Container>
      <Title>
        {greetingMessage()}
        {name}!
      </Title>
      <Subtitle>Como você está hoje?</Subtitle>
    </Container>
  );
};

export default memo(Header);
