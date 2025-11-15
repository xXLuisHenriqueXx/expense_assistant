import { Background, Container } from "./styles";
import { PlusCircle } from "lucide-react-native";

import { Button } from "@src/components/Button";

import { useThemeStore } from "@src/stores/ThemeStore";

interface IAddAccountButtonProps {
  onPress: () => void;
  width: number;
}

const AddAccountButton = ({ onPress, width }: IAddAccountButtonProps) => {
  const { theme } = useThemeStore();

  return (
    <Button.PressablePlaceholder onPress={onPress}>
      <Container width={width}>
        <Background />

        <PlusCircle size={72} color={theme.colors.primary} strokeWidth={0.75} />
      </Container>
    </Button.PressablePlaceholder>
  );
};

export default AddAccountButton;
