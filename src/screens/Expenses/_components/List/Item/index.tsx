import { TouchableOpacity } from "react-native";
import {
  Description,
  Line,
  Tag,
  TagsContainer,
  TagsValueDateContainer,
  Title,
  ValueDateContainer,
  ValueDateSingleContainer,
  ValueDateText,
  ValueDateTitle,
} from "./styles";
import { MotiView } from "moti";
import { useNavigation } from "@react-navigation/native";
import { BadgeDollarSign } from "lucide-react-native";

import { IExpense } from "@src/common/entities/Expense";
import { useThemeStore } from "@src/stores/ThemeStore";
import { getDate } from "@src/utils/getDate";
import { PropsStack } from "@src/routes";

interface ItemProps {
  item: IExpense;
  index: number;
  handleDelete: (id: string) => void;
  screen: string;
}

export const Item = ({ item, index, handleDelete, screen }: ItemProps) => {
  const { theme } = useThemeStore();
  const navigation = useNavigation<PropsStack>();

  const handleNavigateToUpdate = () => {
    //     navigation.navigate("UpdateExpense", {
    //       expenseInfo: item,
    //       screen: screen,
    //     });
  };

  return (
    <MotiView
      from={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ type: "timing", duration: 500, delay: index * 100 }}
      style={{
        flex: 1,
        maxWidth: "48%",
        flexDirection: "column",
        alignItems: "center",
        height: 280,
        paddingVertical: 16,
        paddingHorizontal: 8,
        marginBottom: 20,
        borderRadius: Number(theme.borderRadius.default),
        backgroundColor: theme.colors.textSecondary,
      }}
    >
      <TouchableOpacity
        style={{
          flex: 1,
          width: "100%",
          flexDirection: "column",
          alignItems: "center",
        }}
        activeOpacity={0.75}
        onPress={handleNavigateToUpdate}
        onLongPress={() => handleDelete(item?.id)}
      >
        <BadgeDollarSign size={32} color={theme.colors.highlight} />

        <Title numberOfLines={2}>{item.title}</Title>

        <Description numberOfLines={6}>{item.description}</Description>

        <TagsValueDateContainer>
          <TagsContainer>
            {item.category.map((category, index) => (
              <Tag
                key={index}
                borderColor={category.borderColor}
                backgroundColor={category.backgroundColor}
              >
                {category.name}
              </Tag>
            ))}
          </TagsContainer>

          <Line />

          <ValueDateContainer>
            <ValueDateSingleContainer>
              <ValueDateTitle>Valor</ValueDateTitle>
              <ValueDateText>R$ {item.value.toFixed(2)}</ValueDateText>
            </ValueDateSingleContainer>

            <ValueDateSingleContainer>
              <ValueDateTitle>Vencimento</ValueDateTitle>
              <ValueDateText>{getDate(item.date)}</ValueDateText>
            </ValueDateSingleContainer>
          </ValueDateContainer>
        </TagsValueDateContainer>
      </TouchableOpacity>
    </MotiView>
  );
};
