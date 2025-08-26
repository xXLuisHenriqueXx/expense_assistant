export interface IAccount {
  id: string;
  name: string;
  slug: string;
  first_color: string;
  second_color: string;
  type: "bank" | "digital_wallet";
  currency: string;
}

export interface IUserAccount {
  user_id: string;
  account_id: string;
  balance: number;
  account: IAccount;
}
