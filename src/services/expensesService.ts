import AsyncStorage from "@react-native-async-storage/async-storage";
import { IExpense } from "@src/common/entities/Expense";
import { NotificationsService } from "./notificationService";

export const ExpensesService = {
  getAll: async () => {
    const expenses = await AsyncStorage.getItem("@expenses");

    const parsedExpenses = expenses ? JSON.parse(expenses) : [];
    const constantExpenses = parsedExpenses.filter(
      (expense: IExpense) => expense.type === "constant"
    );
    const variableExpenses = parsedExpenses.filter(
      (expense: IExpense) => expense.type === "variable"
    );

    return {
      constantExpenses,
      variableExpenses,
    };
  },

  findExpenseById: async (id: string) => {
    const expenses = await AsyncStorage.getItem("@expenses");

    const parsedExpenses = expenses ? JSON.parse(expenses) : [];
    const foundExpense = parsedExpenses.find(
      (expense: IExpense) => expense.id === id
    );

    return foundExpense;
  },

  create: async (expense: IExpense) => {
    const expenses = await AsyncStorage.getItem("@expenses");

    const parsedExpenses = expenses ? JSON.parse(expenses) : [];
    parsedExpenses.push(expense);

    await AsyncStorage.setItem("@expenses", JSON.stringify(parsedExpenses));

    NotificationsService.scheduleNotification({
      id: expense.id,
      title: expense.title,
      date: expense.date,
    });
  },

  update: async (expense: IExpense) => {
    const expenses = await AsyncStorage.getItem("@expenses");

    const parsedExpenses = expenses ? JSON.parse(expenses) : [];
    const updatedExpenses = parsedExpenses.map((item: IExpense) => {
      if (item.id === expense.id) {
        return expense;
      }

      return item;
    });

    await AsyncStorage.setItem("@expenses", JSON.stringify(updatedExpenses));
  },

  delete: async (id: string) => {
    const expenses = await AsyncStorage.getItem("@expenses");

    const parsedExpenses = expenses ? JSON.parse(expenses) : [];
    const updatedExpenses = parsedExpenses.filter(
      (item: IExpense) => item.id !== id
    );

    await AsyncStorage.setItem("@expenses", JSON.stringify(updatedExpenses));
  },
};
