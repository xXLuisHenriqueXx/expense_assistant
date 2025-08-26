import { useSQLiteContext } from "expo-sqlite";
import uuid from "react-native-uuid";

import { IUser } from "@src/common/entities/User";

export function useUserDatabase() {
  const database = useSQLiteContext();

  async function get(): Promise<IUser | null> {
    try {
      const response = await database.getFirstAsync<IUser>(
        "SELECT id, name, email FROM user LIMIT 1"
      );

      return response ?? null;
    } catch (error) {
      throw error;
    }
  }

  async function create(name: string, email?: string): Promise<IUser> {
    const statement = await database.prepareAsync(
      "INSERT INTO user (name, email) VALUES ($name, $email)"
    );

    try {
      const { lastInsertRowId: id } = await statement.executeAsync({
        $name: name,
        $email: email ?? null,
      });

      return { id, name, email: email ?? null };
    } catch (error) {
      throw error;
    } finally {
      await statement.finalizeAsync();
    }
  }

  async function remove(): Promise<void> {
    try {
      await database.execAsync("DELETE FROM user");
    } catch (error) {
      throw error;
    }
  }

  return { get, create, remove };
}
