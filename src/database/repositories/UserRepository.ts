import { BaseRepository } from "./BaseRepository";
import { IUser } from "@src/common/entities/User";

export class UserRepository extends BaseRepository {
  async get(): Promise<IUser | null> {
    return await this.db.getFirstAsync<IUser>(
      "SELECT id, name, email FROM user LIMIT 1"
    );
  }

  async create(name: string, email?: string): Promise<IUser> {
    const statement = await this.db.prepareAsync(
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

  async remove(): Promise<void> {
    await this.db.execAsync("DELETE FROM user");
  }
}
