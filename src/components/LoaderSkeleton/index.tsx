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
      radius={Number(theme.borderRadius.xl)}
      colors={[theme.colors.highlight10, theme.colors.primary10]}
    />
  );
};

export default LoaderSkeleton;
