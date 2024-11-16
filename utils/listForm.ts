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
  profile: {
    states: {
      apiErrors: {
      },
      loading: {
        submit: false,
      },
      values: {
        full_name: "Test User",
        email: "Test User",
        user_name: "Test User",
        favorite_genre: [],
      },
    },
    structure: {
      title: "",
      rows: [
        {
          rowType: $enum.RowTypeEnum.text,
          label: "Username",
          name: "user_name",
          readonly: true,
        },
        {
          rowType: $enum.RowTypeEnum.text,
          label: "Full name",
          name: "full_name",
        },
        {
          rowType: $enum.RowTypeEnum.text,
          label: "Email",
          name: "email",
        },
      ],
      validate: toTypedSchema(
        z.object({
          full_name: z.string().max(50),
          email: z.string().email(),
          user_name: z.string(),
          favorite_genre: z.array(z.string()),})
      ),
      bottomSlotName: "btnArea",
    },
  }
};
