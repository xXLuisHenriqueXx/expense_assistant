import { useRef, useState } from "react";
import { Alert } from "react-native";
import {
  CategoriesMapContainer,
  Category,
  CategoryInputContainer,
  CategoryText,
  CategoryTitle,
  Container,
  Description,
  Input,
  InputContainer,
  InputContainerDescription,
  InputValueDate,
  SeparatorText,
  Title,
} from "./styles";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import CurrencyInput from "react-native-currency-input";
import { Book, Bookmark, Calendar } from "lucide-react-native";

import { BackButton } from "@src/components/BackButton";
import { SaveButton } from "@src/components/SaveButton";

import { PropsNavigationStack, PropsStack } from "@src/routes";
import { useThemeStore } from "@src/stores/ThemeStore";
import { validateFields } from "@src/utils/validateFields";
import { CategoriesData } from "@src/static/data/CategoriesData";
import { IExpense } from "@src/common/entities/Expense";
import { ExpensesService } from "@src/services/expensesService";

type Props = NativeStackScreenProps<PropsNavigationStack, "ExpenseForm">;

interface FieldsProps {
  title: string;
  description: string;
  price: number;
  day: string;
  month: string;
  year: string;
}

export const ExpenseForm = ({ route }: Props) => {
  const { theme } = useThemeStore();
  const { screen } = route.params;
  const navigation = useNavigation<PropsStack>();

  const [fields, setFields] = useState<FieldsProps>({
    title: "",
    description: "",
    price: 0,
    day: "",
    month: "",
    year: "",
  });
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const descriptionRef = useRef(null);
  const dayRef = useRef(null);
  const monthRef = useRef(null);
  const yearRef = useRef(null);

  const handleSave = () => {
    const parsedYear = parseInt(fields.year);
    const parsedMonth = parseInt(fields.month);
    const parsedDay = parseInt(fields.day);

    const params = {
      title: fields.title,
      description: fields.description,
      price: fields.price,
      day: parsedDay,
      month: parsedMonth,
      year: parsedYear,
    };

    const validation = validateFields(params);
    if (!validation.success && validation.message) {
      Alert.alert("Erro", validation.message);
      return;
    }

    const date = new Date(parsedYear, parsedMonth - 1, parsedDay);

    const categories = CategoriesData.filter((category) =>
      selectedCategories.includes(category.name)
    );

    const expense: IExpense = {
      id: Math.floor(Math.random() * 1000).toString(),
      title: fields.title,
      description: fields.description,
      value: fields.price,
      date: date,
      category: categories,
      type: screen === "constants" ? "constant" : "variable",
    };

    ExpensesService.create(expense);

    navigation.navigate("Expenses", { newExpense: true });
  };

  const handleCurrencyChange = (formattedValue: number) => {
    setFields({ ...fields, price: formattedValue });
  };

  const handleTextChange = (
    field: keyof FieldsProps,
    value: string,
    nextRef?: any,
    maxLength?: number
  ) => {
    setFields({ ...fields, [field]: value });
    if (maxLength && value.length === maxLength && nextRef) {
      nextRef.current.focus();
    }
  };

  const handleCategoryPress = (categoryName: string) => {
    setSelectedCategories((prevSelectedCategories) => {
      if (prevSelectedCategories.includes(categoryName)) {
        return prevSelectedCategories.filter((name) => name !== categoryName);
      } else if (prevSelectedCategories.length < 2) {
        return [...prevSelectedCategories, categoryName];
      } else {
        return prevSelectedCategories;
      }
    });
  };

  const title =
    screen === "constants" ? "Criar gasto constante" : "Criar gasto variável";

  return (
    <Container>
      <BackButton />

      <SaveButton onPress={handleSave} />

      <Title>{title}</Title>
      <Description>
        Insira as informações do gasto nos campos abaixo
      </Description>

      <InputContainer>
        <Bookmark size={24} color={theme.colors.highlight} />

        <Input
          placeholder="Título"
          placeholderTextColor={theme.colors.primary30}
          value={fields.title}
          onChangeText={(text: string) =>
            handleTextChange("title", text, descriptionRef)
          }
          keyboardType="default"
        />
      </InputContainer>

      <InputContainerDescription>
        <Book
          size={24}
          color={theme.colors.highlight}
          style={{
            top: 14,
          }}
        />

        <Input
          placeholder="Descrição"
          placeholderTextColor={theme.colors.primary30}
          value={fields.description}
          onChangeText={(text: string) =>
            handleTextChange("description", text, dayRef)
          }
          multiline
        />
      </InputContainerDescription>

      <InputContainer>
        <Calendar size={24} color={theme.colors.highlight} />

        <InputValueDate
          ref={dayRef}
          placeholder="DD"
          placeholderTextColor={theme.colors.primary30}
          value={fields.day}
          onChangeText={(text: string) =>
            handleTextChange("day", text, monthRef, 2)
          }
          keyboardType="numeric"
          maxLength={2}
        />

        <SeparatorText>/</SeparatorText>

        <InputValueDate
          ref={monthRef}
          placeholder="MM"
          placeholderTextColor={theme.colors.primary30}
          value={fields.month}
          onChangeText={(text: string) =>
            handleTextChange("month", text, yearRef, 2)
          }
          keyboardType="numeric"
          maxLength={2}
        />

        <SeparatorText>/</SeparatorText>

        <InputValueDate
          ref={yearRef}
          placeholder="AAAA"
          placeholderTextColor={theme.colors.primary30}
          value={fields.year}
          onChangeText={(text: string) =>
            handleTextChange("year", text, null, 4)
          }
          keyboardType="numeric"
          maxLength={4}
        />
      </InputContainer>

      <CurrencyInput
        value={fields.price}
        onChangeValue={handleCurrencyChange}
        prefix="R$ "
        delimiter="."
        separator=","
        precision={2}
        style={{
          width: "100%",
          height: 60,
          paddingHorizontal: 8,
          borderWidth: 2,
          borderColor: theme.colors.highlight,
        }}
      />

      <CategoryInputContainer>
        <CategoryTitle>Selecione até duas categorias</CategoryTitle>
        <CategoriesMapContainer>
          {CategoriesData.map((category, index) => (
            <Category
              key={index}
              isSelected={selectedCategories.includes(category.name)}
              onPress={() => handleCategoryPress(category.name)}
            >
              <CategoryText>{category.name}</CategoryText>
            </Category>
          ))}
        </CategoriesMapContainer>
      </CategoryInputContainer>
    </Container>
  );
};
