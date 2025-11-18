import { useState } from "react";

import ContainerMain from "@src/components/ContainerMain";
import Header from "./_components/Header";
import AddAccountModal from "./_components/AddAccountModal";
import UserAccounts from "./_components/UserAccounts";

import { useUserStore } from "@src/stores/UserStore";

const Home = () => {
  const { user } = useUserStore();

  const [showModal, setShowModal] = useState<boolean>(false);

  if (!user) return;

  return (
    <>
      <ContainerMain>
        <Header name={user.name} />

        <UserAccounts
          id={user.id}
          showModal={showModal}
          setShowModal={setShowModal}
        />
      </ContainerMain>

      <AddAccountModal
        id={user.id}
        showModal={showModal}
        setShowModal={setShowModal}
      />
    </>
  );
};

export default Home;
