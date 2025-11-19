// src/db/repositories/UserExpenseRepository.ts
import { IUserExpense } from "@src/common/entities/Expense";
import { BaseRepository } from "./BaseRepository";

export class UserExpenseRepository extends BaseRepository {
  private map(row: any): IUserExpense {
    return {
      id: String(row.id),
      user_id: String(row.user_id),
      expense_id: row.expense_id !== null ? String(row.expense_id) : null,
      title: row.title ?? null,
      description: row.description ?? null,
      default_value: row.default_value ?? null,
      type: row.type,
      is_active: row.is_active,
    };
  }

  async getAllByUser(userId: string): Promise<IUserExpense[]> {
    const rows = await this.db.getAllAsync<any>(
      `
      SELECT id, user_id, expense_id, title, description,
             default_value, type, is_active
      FROM user_expenses
      WHERE user_id = ?
      ORDER BY id DESC
      `,
      [userId]
    );

    return rows.map((row) => this.map(row));
  }

  async getById(id: string): Promise<IUserExpense | null> {
    const row = await this.db.getFirstAsync<any>(
      `
      SELECT id, user_id, expense_id, title, description,
             default_value, type, is_active
      FROM user_expenses
      WHERE id = ?
      `,
      [id]
    );

    return row ? this.map(row) : null;
  }

  async create(data: Omit<IUserExpense, "id">): Promise<IUserExpense> {
    const stmt = await this.db.prepareAsync(
      `
      INSERT INTO user_expenses 
        (user_id, expense_id, title, description, default_value, type, is_active)
      VALUES 
        ($user_id, $expense_id, $title, $description, $default_value, $type, $is_active)
      `
    );

    try {
      const res = await stmt.executeAsync({
        $user_id: data.user_id,
        $expense_id: data.expense_id ?? null,
        $title: data.title ?? null,
        $description: data.description ?? null,
        $default_value: data.default_value ?? null,
        $type: data.type,
        $is_active: data.is_active ?? 1,
      });

      return {
        id: String(res.lastInsertRowId),
        ...data,
        expense_id: data.expense_id ?? null,
        title: data.title ?? null,
        description: data.description ?? null,
        default_value: data.default_value ?? null,
      };
    } finally {
      await stmt.finalizeAsync();
    }
  }

  async createFromExpense(
    userId: string,
    expenseTemplate: {
      id: string;
      title: string;
      description?: string | null;
      default_value?: number | null;
      type: "fixed" | "variable";
    }
  ): Promise<IUserExpense> {
    return await this.create({
      user_id: userId,
      expense_id: expenseTemplate.id,
      title: expenseTemplate.title,
      description: expenseTemplate.description ?? null,
      default_value: expenseTemplate.default_value ?? null,
      type: expenseTemplate.type,
      is_active: 1,
    });
  }

  async update(id: string, data: Partial<Omit<IUserExpense, "id">>) {
    const stmt = await this.db.prepareAsync(
      `
      UPDATE user_expenses SET
        expense_id = COALESCE($expense_id, expense_id),
        title = COALESCE($title, title),
        description = COALESCE($description, description),
        default_value = COALESCE($default_value, default_value),
        type = COALESCE($type, type),
        is_active = COALESCE($is_active, is_active)
      WHERE id = $id
      `
    );

    try {
      await stmt.executeAsync({
        $id: id,
        $expense_id: data.expense_id ?? null,
        $title: data.title ?? null,
        $description: data.description ?? null,
        $default_value: data.default_value ?? null,
        $type: data.type ?? null,
        $is_active: data.is_active ?? null,
      });
    } finally {
      await stmt.finalizeAsync();
    }
  }

  async remove(id: string) {
    await this.db.runAsync(`DELETE FROM user_expenses WHERE id = ?`, [id]);
  }

  async toggleActive(id: string, active: boolean) {
    await this.db.runAsync(
      `UPDATE user_expenses SET is_active = ? WHERE id = ?`,
      [active ? 1 : 0, id]
    );
  }

  async getActive(userId: string): Promise<IUserExpense[]> {
    const rows = await this.db.getAllAsync<any>(
      `
      SELECT * FROM user_expenses
      WHERE user_id = ? AND is_active = 1
      ORDER BY id DESC
      `,
      [userId]
    );

    return rows.map((row) => this.map(row));
  }
}
