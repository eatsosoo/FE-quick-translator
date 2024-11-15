import type { FormDataType } from "../common/types/form";
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
      title: "Log In Form",
      rows: [
        {
          rowType: $enum.RowTypeEnum.text,
          label: "Username",
          name: "username",
        },
        {
          rowType: $enum.RowTypeEnum.password,
          label: "Password",
          name: "password",
        },
      ],
      validate: toTypedSchema(
        z.object({
          username: z.string(),
          password: z.string().min(8),
        })
      ),
      bottomSlotName: "btnArea",
    },
  },
};
