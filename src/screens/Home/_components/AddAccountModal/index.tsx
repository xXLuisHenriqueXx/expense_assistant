import { useCallback, useEffect, useRef, useState } from "react";
import {
  Container,
  ContainerAvoid,
  ContainerCard,
  ContainerModal,
  Dot,
  DotsContainer,
} from "./styles";
import { Masks } from "react-native-mask-input";
import PagerView, {
  PagerViewOnPageSelectedEvent,
} from "react-native-pager-view";
import { AnimatePresence } from "moti";

import { Button } from "@src/components/Button";
import { Input } from "@src/components/Input";
import AccountCard from "../AccountCard";
import Header from "./Header";

import { useAccountDatabase } from "@src/database/useAccountDatabase";
import { useAccountStore } from "@src/stores/AccountStore";
import { formatBalance } from "@src/utils/formatBalance";
import { WIDTH } from "@src/constants/Values";

interface IAddAccountModalProps {
  id: number | undefined;
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
}
const AddAccountModal = ({
  id,
  showModal,
  setShowModal,
}: IAddAccountModalProps) => {
  const { getAll, getUserAccounts, create } = useAccountDatabase();
  const { accounts, setAccounts } = useAccountStore();

  const pagerRef = useRef<PagerView>(null);

  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [balance, setBalance] = useState<string>("");
  const [loadingState, setLoadingState] = useState<boolean>(true);

  const fetchData = useCallback(async () => {
    try {
      const accounts = await getAll();
      const userAccounts = await getUserAccounts(id!);

      const accountsFiltered = accounts.filter(
        (account) =>
          !userAccounts.find(
            (userAccount) => userAccount.account.id === account.id
          )
      );

      setAccounts(accountsFiltered);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingState(false);
    }
  }, [id, getAll, getUserAccounts, setAccounts]);

  const handlePageSelected = useCallback(
    (event: PagerViewOnPageSelectedEvent) => {
      setActiveIndex(event.nativeEvent.position);
    },
    []
  );

  const handleCreate = () => {
    if (!id) return;
    if (balance === "") return;

    setLoadingState(true);

    try {
      create(
        id,
        accounts[activeIndex].id,
        Number(balance.replace("R$ ", "").replaceAll(".", "").replace(",", "."))
      );
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingState(false);
      setShowModal(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [showModal]);

  const numberOfAccounts = accounts.length;

  return (
    <AnimatePresence>
      {showModal && (
        <Container>
          <ContainerAvoid>
            <ContainerModal>
              <Header onPress={() => setShowModal(false)} />
              <ContainerCard>
                <PagerView
                  ref={pagerRef}
                  style={{ width: "100%", height: 192 }}
                  initialPage={0}
                  onPageSelected={handlePageSelected}
                  overScrollMode={"never"}
                >
                  {accounts.map((account) => (
                    <AccountCard
                      key={account.id}
                      account={account}
                      balance={formatBalance(balance)}
                    />
                  ))}
                </PagerView>

                <DotsContainer>
                  {Array(numberOfAccounts)
                    .fill(null)
                    .map((_, i) => (
                      <Dot key={i} active={i === activeIndex} />
                    ))}
                </DotsContainer>
              </ContainerCard>

              <Input.Masked
                label="Saldo da conta"
                width={WIDTH - 48}
                placeholder="R$ 00,00"
                value={String(balance)}
                onChangeText={(masked: string, unmasked: string) =>
                  setBalance(masked)
                }
                mask={Masks.BRL_CURRENCY}
              />

              <Button.Primary
                text="Adicionar"
                width={WIDTH - 48}
                onPress={handleCreate}
                loading={loadingState}
              />
            </ContainerModal>
          </ContainerAvoid>
        </Container>
      )}
    </AnimatePresence>
  );
};

export default AddAccountModal;
