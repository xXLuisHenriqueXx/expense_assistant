import { Lock, LockOpen, LucideIcon } from "lucide-react-native";

interface NavButtonData {
  title: string;
  screenActive: string;
  icon: LucideIcon;
}

export const NavButtonsData: NavButtonData[] = [
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
