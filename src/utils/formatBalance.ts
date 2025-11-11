export const formatBalance = (balance: string | number) => {
  if (typeof balance === "string")
    balance = balance.replace("R$ ", "").replace(",", ".");

  return Number(balance).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
};
