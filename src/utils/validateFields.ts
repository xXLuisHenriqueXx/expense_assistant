interface FieldsProps {
  title: string;
  description: string;
  price: number;
  day: number;
  month: number;
  year: number;
}

export const validateFields = (fields: FieldsProps) => {
  if (
    !fields.title ||
    !fields.description ||
    !fields.price ||
    !fields.month ||
    !fields.year ||
    !fields.year ||
    !fields.month ||
    !fields.day
  ) {
    return { success: false, message: "Preencha todos os campos" };
  }

  if (fields.day < 1 || fields.day > 31) {
    return { success: false, message: "Dia inválido" };
  }
  if (fields.month < 1 || fields.month > 12) {
    return { success: false, message: "Mês inválido" };
  }

  return { success: true };
};
