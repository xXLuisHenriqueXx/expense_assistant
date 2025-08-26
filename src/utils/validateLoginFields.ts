import { isValidEmail } from "@src/common/regex/Email";
import { IFieldsLogin } from "@src/screens/Login";

export const validateLoginFields = (fields: IFieldsLogin) => {
  if (!fields.name) {
    return { success: false, message: "Preencha o campo nome." };
  }

  if (fields.email && !isValidEmail(fields.email)) {
    return { success: false, message: "Preencha com um email válido." };
  }

  return { success: true, message: "" };
};
