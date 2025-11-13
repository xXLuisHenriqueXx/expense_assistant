export interface IAccount {
  id: number;
  name: string;
  slug: string;
  first_color: string;
  second_color: string;
  type: "bank" | "digital_wallet";
  currency: string;
}

export interface IUserAccount {
  user_id: number;
  account_id: number;
  balance: number;
  account: IAccount;
}
