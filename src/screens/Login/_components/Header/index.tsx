import { Wallet } from "lucide-react-native";
import { Container, Subtitle, Title } from "./styles";

import { useThemeStore } from "@src/stores/ThemeStore";

const Header = () => {
  const { theme } = useThemeStore();

  return (
    <Container
      from={{ opacity: 0, translateY: -500 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: "timing", duration: 500 }}
    >
      <Wallet size={72} color={theme.colors.highlight} strokeWidth={1.5} />

      <Title>Bem vindo(a)</Title>
      <Subtitle>
        Facilite sua organização de financias de forma prática, fácil e sem
        enrolação!
      </Subtitle>
    </Container>
  );
};

export default Header;
