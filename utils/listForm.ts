import type { FormDataType } from "./types/form";
import * as z from "zod";
import { toTypedSchema } from "@vee-validate/zod";

export const $listForm: { [key: string]: FormDataType } = {
  login: {
    states: {
      apiErrors: {
        username: "",
        password: "",
      },
      loading: {
        submit: false,
      },
      values: {
        username: "",
        password: "",
      },
    },
    structure: {
      title: "Login Form",
      rows: [
        {
          rowType: RowTypeEnum.text,
          label: "Username",
          name: "username",
        },
        {
          rowType: RowTypeEnum.password,
          label: "Password",
          name: "password",
        },
      ],
      validate: toTypedSchema(
        z.object({
          username: z.string(),
          password: z.string().min(6),
        })
      ),
      bottomSlotName: "btnArea",
    },
  },
};
