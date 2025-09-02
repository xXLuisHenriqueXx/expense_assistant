import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      primary: string;
      primary10: string;
      primary30: string;
      primary60: string;
      primary80: string;
      secondary: string;
      tertiary: string;
      highlight: string;
      highlight10: string;
      highlight30: string;
      highlight60: string;
      highlight80: string;
    };
    borderRadius: {
      default: string;
    };
    fonts: {
      interRegular: string;
      interMedium: string;
      interSemiBold: string;
      interBold: string;
      interExtraBold: string;
    };
  }
}
