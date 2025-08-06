import { Container } from "./styles";
import Svg, { G, Path } from "react-native-svg";
import { useNavigation } from "@react-navigation/native";
import { Plus } from "lucide-react-native";

import { useThemeStore } from "@src/stores/ThemeStore";
import { PropsStack } from "@src/routes";

interface AddButtonProps {
  screen: string;
}

export const AddButton = ({ screen }: AddButtonProps) => {
  const { theme } = useThemeStore();
  const navigation = useNavigation<PropsStack>();

  const handleNavigate = () => {
    navigation.navigate("ExpenseForm", {
      screen,
    });
  };

  return (
    <Container onPress={handleNavigate}>
      <Svg width="52" height="58" viewBox="0 0 52 58" fill="none">
        <Path
          d="M21 1.88675C24.094 0.100424 27.906 0.100423 31 1.88675L46.9808 11.1132C50.0748 12.8996 51.9808 16.2008 51.9808 19.7735V38.2265C51.9808 41.7992 50.0748 45.1004 46.9808 46.8867L31 56.1132C27.906 57.8996 24.094 57.8996 21 56.1133L5.01924 46.8868C1.92523 45.1004 0.0192375 41.7992 0.0192375 38.2265V19.7735C0.0192375 16.2008 1.92523 12.8996 5.01924 11.1132L21 1.88675Z"
          fill={theme.colors.highlight}
        />
        <G transform="translate(26, 29) translate(-16, -16)">
          <Plus size={32} color={theme.colors.secondary} />
        </G>
      </Svg>
    </Container>
  );
};
