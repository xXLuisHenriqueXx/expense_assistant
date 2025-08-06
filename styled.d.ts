import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      primary: string;
      primary30: string;
      secondary: string;
      highlight: string;
      highlight30: string;
      tertiary: string;
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
