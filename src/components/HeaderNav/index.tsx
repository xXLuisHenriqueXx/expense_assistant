import { Container, NavButton, NavButtonText } from "./styles";

import { useThemeStore } from "@src/stores/ThemeStore";
import { NavButtonsData } from "@src/static/data/NavButtons";

interface HeaderNavProps {
  screen: string;
  setScreen: (screen: string) => void;
}

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
          >
            <NavButtonText isActive={isScreenActive}>{title}</NavButtonText>

            <Icon
              size={16}
              strokeWidth={3}
              color={
                isScreenActive ? theme.colors.tertiary : theme.colors.highlight
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
