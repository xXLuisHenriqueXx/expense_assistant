import React, { useRef, useState } from "react";
import { ActivityIndicator, Alert, TextInput } from "react-native";
import {
  ButtonLogin,
  Container,
  ContainerInput,
  ContainerOverlay,
  Form,
  Header,
  Input,
  Label,
  Subtitle,
  TextLogin,
  Title,
} from "./styles";
import { Wallet } from "lucide-react-native";

import { useThemeStore } from "@src/stores/ThemeStore";
import { useUserDatabase } from "@src/database/useUserDatabase";
import { useUserStore } from "@src/stores/UserStore";

interface IFields {
  name: string;
  email?: string;
}

const Login = () => {
  const { theme } = useThemeStore();
  const { create } = useUserDatabase();
  const { setUser, isLoading, setLoading } = useUserStore();

  const emailRef = useRef<TextInput>();

  const [fields, setFields] = useState<IFields>({
    name: "",
    email: "",
  });

  const handleLogin = async () => {
    setLoading(true);
    const newUser = await create(fields.name, fields.email);
    setUser(newUser);
    setLoading(false);

    Alert.alert("Cadastro realizado com sucesso!");
  };

  return (
    <Container
      source={require("@assets/purple_background.jpg")}
      resizeMode="cover"
    >
      <ContainerOverlay />

      <Header
        from={{ opacity: 0, translateY: 500 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: "spring", duration: 1000 }}
      >
        <Wallet size={72} color={theme.colors.highlight} style={{}} />
        <Title>Bem vindo(a)</Title>
        <Subtitle>
          Facilite sua organização de financias de forma prática, fácil e sem
          enrolação!
        </Subtitle>
      </Header>

      <Form
        style={{ elevation: 32, shadowColor: theme.colors.primary }}
        contentContainerStyle={{ rowGap: 48, paddingBottom: 32 }}
        from={{ opacity: 0, translateY: -500 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: "spring", duration: 1000 }}
      >
        <ContainerInput style={{ marginTop: 64 }}>
          <Label>Nome</Label>
          <Input
            placeholder="Seu nome ..."
            placeholderTextColor={theme.colors.primary30}
            returnKeyType="next"
            onsubmitEditing={() => emailRef.current?.focus()}
            value={fields.name}
            onChangeText={(text: string) =>
              setFields({ ...fields, name: text })
            }
            onSubmitEditing={() => emailRef.current?.focus()}
          />
        </ContainerInput>
        <ContainerInput>
          <Label>E-mail</Label>
          <Input
            ref={emailRef}
            placeholder="Seu e-mail ..."
            placeholderTextColor={theme.colors.primary30}
            returnKeyType="done"
            onSubmitEditing={() => emailRef.current?.focus()}
            value={fields.email}
            onChangeText={(text: string) =>
              setFields({ ...fields, email: text })
            }
          />
        </ContainerInput>

        <ButtonLogin onPress={handleLogin} disabled={isLoading}>
          {isLoading ? (
            <ActivityIndicator size="large" color={theme.colors.primary} />
          ) : (
            <TextLogin>Acessar</TextLogin>
          )}
        </ButtonLogin>
      </Form>
    </Container>
  );
};

export default Login;
