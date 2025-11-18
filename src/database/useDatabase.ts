import { useSQLiteContext } from "expo-sqlite";
import { UserRepository } from "./repositories/UserRepository";
import { AccountRepository } from "./repositories/AccountRepository";

export function useDatabase() {
  const db = useSQLiteContext();

  return {
    user: new UserRepository(db),
    account: new AccountRepository(db),
  };
}
