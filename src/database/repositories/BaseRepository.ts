import { SQLiteDatabase } from "expo-sqlite";

export abstract class BaseRepository {
  protected db: SQLiteDatabase;

  constructor(db: SQLiteDatabase) {
    this.db = db;
  }
}
