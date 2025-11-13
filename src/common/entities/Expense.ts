export interface IExpense {
  id: string;
  title: string;
  description?: string | null;
  default_value?: number | null;
  type: "fixed" | "variable";
  frequency: "monthly" | "yearly" | "weekly";
}

export type IUserExpense = {
  id: string;
  user_id: string;
  expense_id?: string | null;
  title?: string | null;
  description?: string | null;
  default_value?: number | null;
  type: "fixed" | "variable";
  is_active: number;
};
