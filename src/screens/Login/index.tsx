import { useRef, useState } from "react";
import { Alert, TextInput } from "react-native";
import { Form } from "./styles";

import { Input } from "@src/components/Input";
import { Button } from "@src/components/Button";
import ContainerMain from "@src/components/ContainerMain";
import Header from "./_components/Header";

import { useUserDatabase } from "@src/database/useUserDatabase";
import { useUserStore } from "@src/stores/UserStore";
import { validateLoginFields } from "@src/utils/validateLoginFields";
import { WIDTH } from "@src/constants/Values";

export interface IFieldsLogin {
  name: string;
  email?: string;
}

const Login = () => {
  const { create } = useUserDatabase();
  const { setUser, isLoading, setLoading } = useUserStore();

  const nameRef = useRef<TextInput>();
  const emailRef = useRef<TextInput>();

  const [fields, setFields] = useState<IFieldsLogin>({
    name: "",
    email: "",
  });

  const handleLogin = async () => {
    const { success, message } = validateLoginFields(fields);
    if (!success) {
      Alert.alert(message);
      return;
    }

    setLoading(true);
    const newUser = await create(fields.name, fields.email);
    setUser(newUser);
    setLoading(false);

    Alert.alert("Cadastro realizado com sucesso!");
  };

  return (
    <ContainerMain>
      <Header />

      <Form
        from={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ type: "timing", duration: 500 }}
      >
        <Input.Normal
          ref={nameRef}
          width={WIDTH - 48}
          label="Nome*"
          placeholder="Seu nome ..."
          value={fields.name}
          onChangeText={(text: string) => setFields({ ...fields, name: text })}
          returnKeyType="next"
          onSubmitEditing={() => emailRef.current?.focus()}
        />

        <Input.Normal
          ref={emailRef}
          width={WIDTH - 48}
          label="E-mail"
          placeholder="Seu e-mail ..."
          value={fields.email}
          onChangeText={(text: string) => setFields({ ...fields, email: text })}
          returnKeyType="done"
          onSubmitEditing={handleLogin}
        />
      </Form>

      <Button.Primary
        style={{ position: "absolute", bottom: 64 }}
        width={WIDTH - 48}
        text="Acessar"
        onPress={handleLogin}
        loading={isLoading}
      />
    </ContainerMain>
  );
};

export default Login;
