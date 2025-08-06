import { ICategory } from "./Category";

export interface IExpense {
  id: string;
  title: string;
  description: string;
  value: number;
  date: Date;
  category: ICategory[];
  type: "constant" | "variable";
}
