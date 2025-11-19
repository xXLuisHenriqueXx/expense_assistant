import { View, Text } from "react-native";
import {
  Container,
  ContainerBar,
  ContainerBarSection,
  ContainerLegendItem,
  ContainerLegendList,
  LegendIcon,
  LegendText,
  Title,
  BalanceText,
} from "./styles";

const ExpenseTotal = () => {
  return (
    <Container>
      <Title>Seu gasto total</Title>
      <BalanceText>R$ 1.000.000.000,00</BalanceText>

      <ContainerBar>
        <ContainerBarSection width={33.3} color="red" />
        <ContainerBarSection width={33.3} color="yellow" />
        <ContainerBarSection width={33.3} color="green" />
      </ContainerBar>

      <ContainerLegendList>
        <ContainerLegendItem>
          <LegendIcon color="red" />
          <LegendText>Alimentação</LegendText>
        </ContainerLegendItem>

        <ContainerLegendItem>
          <LegendIcon color="yellow" />
          <LegendText>Transporte</LegendText>
        </ContainerLegendItem>

        <ContainerLegendItem>
          <LegendIcon color="green" />
          <LegendText>Outros</LegendText>
        </ContainerLegendItem>
      </ContainerLegendList>
    </Container>
  );
};

export default ExpenseTotal;
