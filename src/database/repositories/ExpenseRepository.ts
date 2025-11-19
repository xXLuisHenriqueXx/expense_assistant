// src/db/repositories/ExpenseRepository.ts
import { IExpense } from "@src/common/entities/Expense";
import { BaseRepository } from "./BaseRepository";

export class ExpenseRepository extends BaseRepository {
  async getAll(): Promise<IExpense[]> {
    const rows = await this.db.getAllAsync<any>(
      `SELECT id, title, description, default_value, type, frequency
       FROM expenses
       ORDER BY title ASC`
    );

    return rows.map(this.mapToExpense);
  }

  async getById(id: string): Promise<IExpense | null> {
    const row = await this.db.getFirstAsync<any>(
      `SELECT id, title, description, default_value, type, frequency
       FROM expenses
       WHERE id = ?`,
      [id]
    );

    return row ? this.mapToExpense(row) : null;
  }

  async create(data: Omit<IExpense, "id">): Promise<IExpense> {
    const statement = await this.db.prepareAsync(
      `INSERT INTO expenses
        (title, description, default_value, type, frequency)
       VALUES
        ($title, $description, $default_value, $type, $frequency)`
    );

    try {
      const result = await statement.executeAsync({
        $title: data.title,
        $description: data.description ?? null,
        $default_value: data.default_value ?? null,
        $type: data.type,
        $frequency: data.frequency,
      });

      return {
        id: String(result.lastInsertRowId),
        ...data,
      };
    } finally {
      await statement.finalizeAsync();
    }
  }

  async update(id: string, data: Partial<Omit<IExpense, "id">>) {
    const statement = await this.db.prepareAsync(
      `UPDATE expenses SET
          title = COALESCE($title, title),
          description = COALESCE($description, description),
          default_value = COALESCE($default_value, default_value),
          type = COALESCE($type, type),
          frequency = COALESCE($frequency, frequency)
       WHERE id = $id`
    );

    try {
      await statement.executeAsync({
        $id: id,
        $title: data.title ?? null,
        $description: data.description ?? null,
        $default_value: data.default_value ?? null,
        $type: data.type ?? null,
        $frequency: data.frequency ?? null,
      });
    } finally {
      await statement.finalizeAsync();
    }
  }

  async remove(id: string): Promise<void> {
    await this.db.runAsync(`DELETE FROM expenses WHERE id = ?`, [id]);
  }

  async getCategories(expenseId: string): Promise<string[]> {
    const rows = await this.db.getAllAsync<{ category_id: number }>(
      `SELECT category_id FROM expense_categories WHERE expense_id = ?`,
      [expenseId]
    );

    return rows.map((r) => String(r.category_id));
  }

  async setCategories(expenseId: string, categoryIds: string[]): Promise<void> {
    await this.db.execAsync("BEGIN;");

    try {
      await this.db.runAsync(
        `DELETE FROM expense_categories WHERE expense_id = ?`,
        [expenseId]
      );

      for (const categoryId of categoryIds) {
        await this.db.runAsync(
          `INSERT INTO expense_categories (expense_id, category_id)
           VALUES (?, ?)`,
          [expenseId, categoryId]
        );
      }

      await this.db.execAsync("COMMIT;");
    } catch (e) {
      await this.db.execAsync("ROLLBACK;");
      throw e;
    }
  }

  async getWithCategories(id: string) {
    const expense = await this.getById(id);
    if (!expense) return null;

    const categories = await this.getCategories(id);

    return { ...expense, categories };
  }

  private mapToExpense(row: any): IExpense {
    return {
      id: String(row.id),
      title: row.title,
      description: row.description ?? null,
      default_value: row.default_value ?? null,
      type: row.type,
      frequency: row.frequency,
    };
  }
}
