import { CloseButton, Container, Title } from "./styles";
import { X } from "lucide-react-native";

import { useThemeStore } from "@src/stores/ThemeStore";

interface IHeaderProps {
  onPress: () => void;
}

const Header = ({ onPress }: IHeaderProps) => {
  const { theme } = useThemeStore();

  return (
    <Container>
      <Title>Adicionar conta</Title>
      <CloseButton onPress={onPress}>
        <X size={16} color={theme.colors.primary} />
      </CloseButton>
    </Container>
  );
};

export default Header;
