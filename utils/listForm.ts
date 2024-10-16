import type { FormDataType } from "./types/form";
import * as z from "zod";
import { toTypedSchema } from "@vee-validate/zod";

export const $listForm: { [key: string]: FormDataType } = {
  login: {
    states: {
      apiErrors: {
        email: "",
        password: "",
      },
      loading: {
        submit: false,
      },
      values: {
        email: "",
        password: "",
      },
    },
    structure: {
      title: "Login Form",
      rows: [
        {
          rowType: RowTypeEnum.text,
          label: "Email",
          name: "email",
        },
        {
          rowType: RowTypeEnum.password,
          label: "Password",
          name: "password",
        },
      ],
      validate: toTypedSchema(
        z.object({
          email: z.string().email(),
          password: z.string().min(6),
        })
      ),
      bottomSlotName: "btnArea",
    },
  },
};
