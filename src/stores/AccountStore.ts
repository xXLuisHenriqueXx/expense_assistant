import { create } from "zustand";
import { IAccount, IUserAccount } from "@src/common/entities/Account";

interface AccountState {
  accounts: IAccount[];
  userAccounts: IUserAccount[];
  isLoading: boolean;
  setAccounts: (accounts: IAccount[]) => void;
  setUserAccounts: (userAccounts: IUserAccount[]) => void;
  setLoading: (loading: boolean) => void;
  clear: () => void;
}

export const useAccountStore = create<AccountState>((set) => ({
  accounts: [],
  userAccounts: [],
  isLoading: false,

  setAccounts: (accounts) => set({ accounts }),
  setUserAccounts: (userAccounts) => set({ userAccounts }),
  setLoading: (loading) => set({ isLoading: loading }),
  clear: () => set({ accounts: [], userAccounts: [] }),
}));
