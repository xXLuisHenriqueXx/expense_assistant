import { Alert, FlatList, ListRenderItem, RefreshControl } from "react-native";
import { OctagonX } from "lucide-react-native";

import { IExpense } from "@src/common/entities/Expense";
import { useThemeStore } from "@src/stores/ThemeStore";
import { ExpensesService } from "@src/services/expensesService";
import {
  ContainerNotFound,
  RefreshButton,
  RefreshButtonText,
  Subtitle,
  Title,
} from "./styles";
import { Item } from "./Item";
import ContainerRenderAnimated from "@src/components/ContainerRenderAnimated";
import { useState } from "react";

interface ExpensesListProps {
  data: IExpense[];
  onRefresh: () => void;
  isRefreshing: boolean;
  screen: string;
}

export const List = ({
  data,
  onRefresh,
  isRefreshing,
  screen,
}: ExpensesListProps) => {
  const { theme } = useThemeStore();

  const [deletedExpense, setDeletedExpense] = useState<boolean>(false);

  const handleDelete = (id: string) => {
    Alert.alert("DELETAR", "Deseja realmente deletar?", [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Sim",
        onPress: async () => {
          await ExpensesService.delete(id);

          setDeletedExpense(true);
          onRefresh();
        },
      },
    ]);
  };

  const renderItem: ListRenderItem<IExpense> = ({ item, index }) => (
    <ContainerRenderAnimated index={index} isDeleted={deletedExpense}>
      <Item item={item} handleDelete={handleDelete} screen={screen} />
    </ContainerRenderAnimated>
  );

  return (
    <>
      {data.length ? (
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          refreshControl={
            <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
          }
        />
      ) : (
        <ContainerNotFound>
          <OctagonX
            size={96}
            strokeWidth={1.5}
            color={theme.colors.highlight}
          />
          <Title>Eita!</Title>
          <Subtitle>Parece que você não possui nenhum gasto</Subtitle>

          <RefreshButton onPress={onRefresh}>
            <RefreshButtonText>Atualizar</RefreshButtonText>
          </RefreshButton>
        </ContainerNotFound>
      )}
    </>
  );
};
