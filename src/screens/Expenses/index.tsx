import { useCallback, useEffect, useState } from "react";
import { Container } from "./styles";
import { useIsFocused } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { HeaderNav } from "@src/components/HeaderNav";
import { List } from "./_components/List";
import { AddButton } from "@src/components/AddButton";
import { ExpensesService } from "@src/services/expensesService";
import { PropsNavigationStack } from "@src/routes";
import { IExpense } from "@src/common/entities/Expense";

type Props = NativeStackScreenProps<PropsNavigationStack, "Expenses">;

export const Expenses = ({ route }: Props) => {
  const { newExpense } = route.params || { newExpense: false };
  const isFocused = useIsFocused();

  const [screen, setScreen] = useState<string>("constants");
  const [expensesConstant, setExpensesConstant] = useState<IExpense[]>([]);
  const [expensesVariable, setExpensesVariable] = useState<IExpense[]>([]);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  useEffect(() => {
    if (newExpense || isFocused) {
      getExpenses();

      onRefresh();
    }
  }, [newExpense, isFocused]);

  const getExpenses = async () => {
    const expenses = await ExpensesService.getAll();

    setExpensesConstant(expenses.constantExpenses);
    setExpensesVariable(expenses.variableExpenses);
  };

  const onRefresh = useCallback(() => {
    setIsRefreshing(true);
    getExpenses().then(() => setIsRefreshing(false));
  }, []);

  return (
    <Container>
      <HeaderNav screen={screen} setScreen={setScreen} />

      <List
        data={screen === "constants" ? expensesConstant : expensesVariable}
        onRefresh={onRefresh}
        isRefreshing={isRefreshing}
        screen={screen}
      />

      <AddButton screen={screen} />
    </Container>
  );
};
