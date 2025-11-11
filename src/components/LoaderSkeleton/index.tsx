import { Skeleton } from "moti/skeleton";

import { useThemeStore } from "@src/stores/ThemeStore";

interface ILoaderSkeletonProps {
  width: number;
  height: number;
}

const LoaderSkeleton = ({ width, height }: ILoaderSkeletonProps) => {
  const { theme } = useThemeStore();

  return (
    <Skeleton
      width={width}
      height={height}
      radius={16}
      colors={[theme.colors.highlight30, theme.colors.primary30]}
    />
  );
};

export default LoaderSkeleton;
