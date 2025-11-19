import { useSQLiteContext } from "expo-sqlite";
import { UserRepository } from "./repositories/UserRepository";
import { AccountRepository } from "./repositories/AccountRepository";
import { ExpenseRepository } from "./repositories/ExpenseRepository";
import { UserExpenseRepository } from "./repositories/UserExpensesRepository";

export function useDatabase() {
  const db = useSQLiteContext();

  return {
    user: new UserRepository(db),
    account: new AccountRepository(db),
    expense: new ExpenseRepository(db),
    userExpense: new UserExpenseRepository(db),
  };
}
