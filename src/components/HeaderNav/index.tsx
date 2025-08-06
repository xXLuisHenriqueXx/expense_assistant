import { Container, Lock, LockOpen, LucideIcon } from "lucide-react-native";

import { useThemeStore } from "@src/stores/ThemeStore";
import { NavButton, NavButtonText } from "./styled";

interface HeaderNavProps {
  screen: string;
  setScreen: (screen: string) => void;
}

interface NavButtonData {
  title: string;
  screenActive: string;
  icon: LucideIcon;
}

const NavButtonsData: NavButtonData[] = [
  {
    title: "Constantes",
    screenActive: "constants",
    icon: Lock,
  },
  {
    title: "Variáveis",
    screenActive: "variables",
    icon: LockOpen,
  },
];

export const HeaderNav = ({ screen, setScreen }: HeaderNavProps) => {
  const { theme } = useThemeStore();

  return (
    <Container>
      {NavButtonsData.map(({ screenActive, title, icon: Icon }, index) => {
        const isScreenActive = screen === screenActive;

        return (
          <NavButton
            key={index}
            isActive={isScreenActive}
            onPress={() => setScreen(screenActive)}
            style={{
              elevation: 10,
              shadowColor: theme.colors.highlight,
            }}
          >
            <NavButtonText isActive={isScreenActive}>{title}</NavButtonText>

            <Icon
              size={16}
              strokeWidth={3}
              color={
                isScreenActive
                  ? theme.colors.textSecondary
                  : theme.colors.highlight
              }
              style={{
                position: "absolute",
                left: 16,
              }}
            />
          </NavButton>
        );
      })}
    </Container>
  );
};
