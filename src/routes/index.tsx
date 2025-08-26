import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import Login from "@src/screens/Login";
import Home from "@src/screens/Home";
import Expenses from "@src/screens/Expenses";

import { useEffect } from "react";
import { useUserDatabase } from "@src/database/useUserDatabase";
import { useUserStore } from "@src/stores/UserStore";

export type PropsNavigationStack = {
  Login: undefined;
  Home: undefined;
  Expenses: undefined;
};

const Stack = createNativeStackNavigator<PropsNavigationStack>();

export type PropsStack = NativeStackNavigationProp<PropsNavigationStack>;

export const Routes = () => {
  const { get } = useUserDatabase();
  const { user, setUser } = useUserStore();

  useEffect(() => {
    const loadUser = async () => {
      const foundUser = await get();
      setUser(foundUser);
    };
    loadUser();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: "none",
        }}
      >
        {!user ? (
          <Stack.Screen name="Login" component={Login} />
        ) : (
          <>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Expenses" component={Expenses} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
