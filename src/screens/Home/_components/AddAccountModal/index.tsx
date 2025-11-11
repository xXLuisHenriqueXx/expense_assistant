import { useCallback, useEffect, useRef, useState } from "react";
import { ActivityIndicator } from "react-native";
import {
  ButtonCreate,
  CloseButton,
  Container,
  ContainerAvoid,
  ContainerCard,
  ContainerClose,
  ContainerHeader,
  ContainerInput,
  ContainerModal,
  Dot,
  DotsContainer,
  Input,
  Label,
  TextCreate,
  Title,
} from "./styles";

import { useAccountDatabase } from "@src/database/useAccountDatabase";
import { useAccountStore } from "@src/stores/AccountStore";
import { useThemeStore } from "@src/stores/ThemeStore";
import { Masks } from "react-native-mask-input";
import { X } from "lucide-react-native";
import { AnimatePresence } from "moti";
import AccountCard from "../AccountCard";
import PagerView, {
  PagerViewOnPageSelectedEvent,
} from "react-native-pager-view";
import { formatBalance } from "@src/utils/formatBalance";

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
  const { theme } = useThemeStore();
  const { getAll, create } = useAccountDatabase();
  const { accounts, setAccounts } = useAccountStore();

  const pagerRef = useRef<PagerView>(null);

  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [balance, setBalance] = useState<string>("");
  const [loadingState, setLoadingState] = useState<boolean>(false);

  const fetchData = async () => {
    setLoadingState(true);

    try {
      const accounts = await getAll();

      setAccounts(accounts);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingState(false);
    }
  };

  const handlePageSelected = useCallback(
    (event: PagerViewOnPageSelectedEvent) => {
      setActiveIndex(event.nativeEvent.position);
    },
    []
  );

  const handleCreate = () => {
    if (!id) return;
    if (balance === "") return;

    console.log(balance);

    setLoadingState(true);

    try {
      const balanceFormated = balance.replace("R$ ", "").replace(",", ".");

      create(id, accounts[activeIndex].id, Number(balanceFormated));
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingState(false);
      setShowModal(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const numberOfAccounts = accounts.length;

  return (
    <AnimatePresence>
      {showModal && (
        <Container>
          <ContainerClose onPress={() => setShowModal(false)} />

          <ContainerAvoid>
            <ContainerModal>
              <ContainerHeader>
                <Title>Adicionar conta</Title>
                <CloseButton onPress={() => setShowModal(false)}>
                  <X size={16} color={theme.colors.primary} />
                </CloseButton>
              </ContainerHeader>

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

              <ContainerInput>
                <Label>Saldo da conta</Label>
                <Input
                  placeholder="Seu e-mail ..."
                  placeholderTextColor={theme.colors.primary25}
                  returnKeyType="done"
                  keyboardType="number-pad"
                  onSubmitEditing={handleCreate}
                  value={balance}
                  onChangeText={(masked: string, unmasked: string) =>
                    setBalance(masked)
                  }
                  mask={Masks.BRL_CURRENCY}
                />
              </ContainerInput>

              <ButtonCreate onPress={handleCreate} disabled={loadingState}>
                {loadingState ? (
                  <ActivityIndicator
                    size="large"
                    color={theme.colors.primary}
                  />
                ) : (
                  <TextCreate>Criar conta</TextCreate>
                )}
              </ButtonCreate>
            </ContainerModal>
          </ContainerAvoid>
        </Container>
      )}
    </AnimatePresence>
  );
};

export default AddAccountModal;
