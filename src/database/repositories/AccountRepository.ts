import { BaseRepository } from "./BaseRepository";
import { IAccount, IUserAccount } from "@src/common/entities/Account";

export class AccountRepository extends BaseRepository {
  async getAll(): Promise<IAccount[]> {
    return await this.db.getAllAsync<IAccount>(
      "SELECT * FROM accounts ORDER BY name ASC"
    );
  }

  async getUserAccounts(userId: number): Promise<IUserAccount[]> {
    const rows = await this.db.getAllAsync<any>(
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

    return rows.map((raw) => ({
      user_id: raw.user_id,
      account_id: raw.account_id,
      balance: raw.balance,
      account: {
        id: raw.a_id,
        name: raw.a_name,
        slug: raw.a_slug,
        first_color: raw.a_first_color,
        second_color: raw.a_second_color,
        type: raw.a_type,
        currency: raw.a_currency,
      },
    }));
  }

  async create(userId: number, accountId: number, initialBalance = 0) {
    const statement = await this.db.prepareAsync(
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

  async updateBalance(userId: number, accountId: number, amount: number) {
    await this.db.runAsync(
      `UPDATE user_accounts SET balance = ? WHERE user_id = ? AND account_id = ?`,
      [amount, userId, accountId]
    );
  }

  async adjustBalance(userId: number, accountId: number, amount: number) {
    await this.db.runAsync(
      `UPDATE user_accounts SET balance = balance + ? WHERE user_id = ? AND account_id = ?`,
      [amount, userId, accountId]
    );
  }

  async remove(userId: number, accountId: number) {
    await this.db.runAsync(
      `DELETE FROM user_accounts WHERE user_id = ? AND account_id = ?`,
      [userId, accountId]
    );
  }
}
