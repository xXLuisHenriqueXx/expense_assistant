import { memo, useEffect, useRef } from "react";
import { useWindowDimensions } from "react-native";
import { Container, ContainerScroll, Title } from "./styles";
import PagerView from "react-native-pager-view";

import AccountCard from "../AccountCard";
import AddAccountButton from "../AddAccountButton";
import LoaderSkeleton from "@src/components/LoaderSkeleton";

import { useAccountStore } from "@src/stores/AccountStore";
import { formatBalance } from "@src/utils/formatBalance";
import { WIDTH } from "@src/constants/Values";
import { useDatabase } from "@src/database/useDatabase";

interface IUserAccountsProps {
  id: number;
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
}

const UserAccounts = ({ id, showModal, setShowModal }: IUserAccountsProps) => {
  const { width } = useWindowDimensions();
  const { account } = useDatabase();
  const { userAccounts, setUserAccounts, setLoading, isLoading } =
    useAccountStore();

  const pagerRef = useRef<PagerView>(null);

  const fetchData = async () => {
    setLoading(true);

    try {
      const userAccounts = await account.getUserAccounts(id);

      setUserAccounts(userAccounts);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id, showModal]);

  if (isLoading) return <LoaderSkeleton width={WIDTH - 48} height={192} />;

  return (
    <Container>
      <Title>Suas contas</Title>
      <ContainerScroll
        ref={pagerRef}
        width={width - 48}
        height={192}
        initialPage={0}
        overScrollMode={"never"}
      >
        {userAccounts.map((acc) => (
          <AccountCard
            key={acc.account_id}
            account={acc.account}
            balance={formatBalance(String(acc.balance))}
          />
        ))}

        <AddAccountButton
          width={width - 48}
          onPress={() => setShowModal(true)}
        />
      </ContainerScroll>
    </Container>
  );
};

export default memo(UserAccounts);
