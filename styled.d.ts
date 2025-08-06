import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      textPrimary: string;
      textSecondary: string;
      textPlaceholder: string;
      highlight: string;
      background: string;
      backgroundSecondary: string;
    };
    borderRadius: {
      default: string;
    };
    fonts: {
      interRegular: string;
      interMedium: string;
      interBold: string;
      interExtraBold: string;
    };
  }
}
