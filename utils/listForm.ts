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
    structures: [
      {
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
    ],
  },
  profile: {
    states: {
      apiErrors: {},
      loading: {
        submit: false,
      },
      values: {
        full_name: "Test User",
        email: "Test User",
        user_name: "Test User",
        favorite_genre: [],
        country: "",
        city: "",
        address: "",
        postal_code: "",
        phone_number: "",
      },
    },
    structures: [
      {
        title: "",
        rows: [
          {
            rowType: $enum.RowTypeEnum.text,
            label: "Username",
            name: "user_name",
            readonly: true,
            rules: z.string().max(50),
          },
          {
            rowType: $enum.RowTypeEnum.text,
            label: "Full name",
            name: "full_name",
            rules: z.string().max(50),
          },
          {
            rowType: $enum.RowTypeEnum.text,
            label: "Email",
            name: "email",
            rules: z.string().email(),
          },
        ],
        bottomSlotName: "btnArea1",
      },
      {
        title: "",
        rows: [
          {
            rowType: $enum.RowTypeEnum.text,
            label: "Country",
            name: "country",
            readonly: true,
            rules: z.string().max(50),
          },
          {
            rowType: $enum.RowTypeEnum.text,
            label: "City",
            name: "city",
            rules: z.string().max(50),
          },
          {
            rowType: $enum.RowTypeEnum.text,
            label: "Postal Code",
            name: "postal_code",
            rules: z.string(),
          },
          {
            rowType: $enum.RowTypeEnum.text,
            label: "Phone Number",
            name: "phone_number",
            rules: z.string().max(10).min(10),
          },
        ],
        bottomSlotName: "btnArea2",
      },
    ],
  },
};
