import { useMemo } from "react";
import { ActivityIndicator, PressableProps, ViewStyle } from "react-native";
import { Button, Text } from "./styles";

import { useThemeStore } from "@src/stores/ThemeStore";
import { WIDTH } from "@src/constants/Values";

type IPrimaryProps = PressableProps & {
  text: string;
  onPress: () => void;
  loading: boolean;
  style?: ViewStyle | ViewStyle[];
  width?: number;
};

const Primary = ({
  text,
  onPress,
  loading,
  style,
  width,
  ...rest
}: IPrimaryProps) => {
  const { theme } = useThemeStore();

  const renderContent = useMemo(() => {
    return loading ? (
      <ActivityIndicator size="small" color={theme.colors.primary} />
    ) : (
      <Text>{text}</Text>
    );
  }, [loading, text]);

  const pressableStyle = useMemo(() => {
    return [style, { opacity: loading ? 0.5 : 1 }];
  }, [loading, style]);

  const buttonWidth = useMemo(() => {
    return width ? width : WIDTH;
  }, [width]);

  return (
    <Button
      style={pressableStyle}
      width={buttonWidth}
      onPress={onPress}
      disabled={loading}
      {...rest}
    >
      {renderContent}
    </Button>
  );
};

export default Primary;
