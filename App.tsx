import { useEffect } from "react";
import { StatusBar } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_700Bold,
  Inter_800ExtraBold,
  useFonts,
} from "@expo-google-fonts/inter";
import "react-native-reanimated";
import "react-native-gesture-handler";
import { ThemeProvider } from "styled-components/native";
import { useThemeStore } from "@src/stores/ThemeStore";
import { Routes } from "@src/routes";

export default function App() {
  const { theme } = useThemeStore();

  const [fontsLoaded] = useFonts({
    Inter_400Regular: Inter_400Regular,
    Inter_500Medium: Inter_500Medium,
    Inter_700Bold: Inter_700Bold,
    Inter_800ExtraBold: Inter_800ExtraBold,
  });

  useEffect(() => {
    const prepare = async () => {
      try {
        await SplashScreen.preventAutoHideAsync();
      } catch (error) {
        console.warn(error);
      } finally {
        if (fontsLoaded) await SplashScreen.hideAsync();
      }
    };

    prepare();
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <>
      <StatusBar
        barStyle={"light-content"}
        backgroundColor={theme.colors.secondary}
      />

      <ThemeProvider theme={theme}>
        <Routes />
      </ThemeProvider>
    </>
  );
}
