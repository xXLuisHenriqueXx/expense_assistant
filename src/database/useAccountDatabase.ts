import { IAccount, IUserAccount } from "@src/common/entities/Account";
import { useSQLiteContext } from "expo-sqlite";

export function useAccountDatabase() {
  const database = useSQLiteContext();

  async function getAll(): Promise<IAccount[]> {
    try {
      const response = await database.getAllAsync<IAccount>(
        `SELECT * FROM accounts ORDER BY name ASC`
      );

      return response;
    } catch (error) {
      throw error;
    }
  }

  async function getUserAccounts(userId: number): Promise<IUserAccount[]> {
    const rows = await database.getAllAsync<any>(
      `
      SELECT ua.user_id, ua.account_id, ua.balance,
             a.id as a_id, a.name as a_name, a.slug as a_slug,
             a.first_color as a_first_color, a.second_color as a_second_color,
             a.type as a_type, a.currency as a_currency
      FROM user_accounts ua
      JOIN accounts a ON ua.account_id = a.id
      WHERE ua.user_id = ?
      ORDER BY a.name ASC
      `,
      [userId]
    );

    return rows.map((row) => ({
      user_id: row.user_id,
      account_id: row.account_id,
      balance: row.balance,
      account: {
        id: row.a_id,
        name: row.a_name,
        slug: row.a_slug,
        first_color: row.a_first_color,
        second_color: row.a_second_color,
        type: row.a_type,
        currency: row.a_currency,
      },
    }));
  }

  async function create(userId: number, accountId: number, initialBalance = 0) {
    const statement = await database.prepareAsync(
      `INSERT OR REPLACE INTO user_accounts (user_id, account_id, balance)
       VALUES ($userId, $accountId, $balance)`
    );
    try {
      await statement.executeAsync({
        $userId: userId,
        $accountId: accountId,
        $balance: initialBalance,
      });
    } finally {
      await statement.finalizeAsync();
    }
  }

  async function updateBalance(
    userId: number,
    accountId: number,
    newBalance: number
  ) {
    await database.runAsync(
      `UPDATE user_accounts SET balance = ? WHERE user_id = ? AND account_id = ?`,
      [newBalance, userId, accountId]
    );
  }

  async function adjustBalance(
    userId: number,
    accountId: number,
    amount: number
  ) {
    await database.runAsync(
      `UPDATE user_accounts SET balance = balance + ? WHERE user_id = ? AND account_id = ?`,
      [amount, userId, accountId]
    );
  }

  async function remove(userId: number, accountId: number) {
    await database.runAsync(
      `DELETE FROM user_accounts WHERE user_id = ? AND account_id = ?`,
      [userId, accountId]
    );
  }

  return {
    getAll,
    getUserAccounts,
    create,
    updateBalance,
    adjustBalance,
    remove,
  };
}
