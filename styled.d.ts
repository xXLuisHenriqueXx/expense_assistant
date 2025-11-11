import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      primary: string;
      primary10: string;
      primary25: string;
      primary50: string;
      primary75: string;
      secondary: string;
      tertiary: string;
      highlight: string;
      highlight10: string;
      highlight25: string;
      highlight50: string;
      highlight75: string;
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
