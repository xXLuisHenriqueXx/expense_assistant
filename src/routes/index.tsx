import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { IExpense } from "@src/common/entities/Expense";
import { Expenses } from "@src/screens/Expenses";
import { ExpenseForm } from "@src/screens/ExpenseForm";

export type PropsNavigationStack = {
  Expenses: {
    newExpense?: boolean;
  };
  ExpenseForm: {
    expenseInfo?: IExpense;
    screen: string;
  };
};

const Stack = createNativeStackNavigator<PropsNavigationStack>();

export type PropsStack = NativeStackNavigationProp<PropsNavigationStack>;

export const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: "none",
        }}
      >
        <Stack.Screen name="Expenses" component={Expenses} />
        <Stack.Screen name="ExpenseForm" component={ExpenseForm} />
        {/* <Stack.Screen name="UpdateExpense" component={UpdateExpense} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
