import { useWindowDimensions } from "react-native";
import {
  Container,
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
import { useNavigation } from "@react-navigation/native";
import { BadgeDollarSign } from "lucide-react-native";

import { IExpense } from "@src/common/entities/Expense";
import { useThemeStore } from "@src/stores/ThemeStore";
import { getDate } from "@src/utils/getDate";
import { PropsStack } from "@src/routes";

interface ItemProps {
  item: IExpense;
  handleDelete: (id: string) => void;
  screen: string;
}

export const Item = ({ item, handleDelete, screen }: ItemProps) => {
  const { width } = useWindowDimensions();
  const { theme } = useThemeStore();
  const navigation = useNavigation<PropsStack>();

  const handleNavigateToUpdate = () => {
    //     navigation.navigate("UpdateExpense", {
    //       expenseInfo: item,
    //       screen: screen,
    //     });
  };

  const containerWidth = (width - 16 * 2 - 16) / 2;

  return (
    <Container
      style={{ width: containerWidth }}
      onPress={handleNavigateToUpdate}
      onLongPress={() => handleDelete(item?.id)}
    >
      <BadgeDollarSign size={32} color={theme.colors.highlight} />

      <Title numberOfLines={2}>{item.title}</Title>

      <Description numberOfLines={6}>{item.description}</Description>

      <TagsValueDateContainer>
        <TagsContainer>
          {item.category.map((category, index) => (
            <Tag key={index}>{category.name}</Tag>
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
    </Container>
  );
};
