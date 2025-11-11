import { Background, Button } from "./styles";
import { PlusCircle } from "lucide-react-native";

import PressableButton from "@src/components/PressableButton";

import { useThemeStore } from "@src/stores/ThemeStore";

interface IAddAccountButtonProps {
  onPress: () => void;
  width: number;
}

const AddAccountButton = ({ onPress, width }: IAddAccountButtonProps) => {
  const { theme } = useThemeStore();

  return (
    <PressableButton onPress={onPress}>
      <Button width={width}>
        <Background />

        <PlusCircle size={72} color={theme.colors.primary} strokeWidth={0.75} />
      </Button>
    </PressableButton>
  );
};

export default AddAccountButton;
