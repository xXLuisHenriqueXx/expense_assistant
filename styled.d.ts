import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      primary: string;
      primary30: string;
      primary60: string;
      primary80: string;
      secondary: string;
      tertiary: string;
      highlight: string;
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
      interBold: string;
      interExtraBold: string;
    };
  }
}
