import { useWindowDimensions } from "react-native";
import {
  Bubble,
  BubbleBorder,
  Container,
  ContainerInfo,
  ContainerLogo,
  Logo,
  TextBalance,
  TextCurrency,
  TextName,
} from "./styles";

import { IAccount } from "@src/common/entities/Account";

interface IAccountProps {
  account: IAccount;
  balance: string;
}
const AccountCard = ({ account, balance }: IAccountProps) => {
  const { width } = useWindowDimensions();

  const logos: Record<string, any> = {
    sicredi: require("@assets/banks_logos/sicredi.png"),
    banrisul: require("@assets/banks_logos/banrisul.png"),
    bradesco: require("@assets/banks_logos/bradesco.png"),
    bancodobrasil: require("@assets/banks_logos/bancodobrasil.png"),
    santander: require("@assets/banks_logos/santander.png"),
    itau: require("@assets/banks_logos/itau.png"),
    caixa: require("@assets/banks_logos/caixa.png"),
    picpay: require("@assets/banks_logos/picpay.png"),
    paypal: require("@assets/banks_logos/paypal.png"),
    mercadopago: require("@assets/banks_logos/mercadopago.png"),
    inter: require("@assets/banks_logos/inter.png"),
    nubank: require("@assets/banks_logos/nubank.png"),
    c6: require("@assets/banks_logos/c6.png"),
  };

  const widthAccounts = width - 48;

  return (
    <Container
      width={widthAccounts}
      colors={[account.first_color, account.second_color]}
    >
      <Bubble />
      <BubbleBorder />

      <ContainerInfo>
        <ContainerLogo>
          <Logo source={logos[account.slug]} />
        </ContainerLogo>
        <TextName>{account.name}</TextName>
      </ContainerInfo>

      <TextCurrency>{account.currency}</TextCurrency>
      <TextBalance>{balance}</TextBalance>
    </Container>
  );
};

export default AccountCard;
