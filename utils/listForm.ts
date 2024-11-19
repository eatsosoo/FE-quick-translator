import type { FormDataType } from "../common/types/form";
import * as z from "zod";

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
            rules: z.string().max(50),
          },
          {
            rowType: $enum.RowTypeEnum.password,
            label: "Password",
            name: "password",
            rules: z.string().min(8)
          },
        ],
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
        style: "border-b border-gray-200 px-4 md:px-8 py-4",
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
        style: "grid grid-cols-3 gap-4 border-b border-gray-200 px-4 md:px-8 py-4",
        rows: [
          {
            rowType: $enum.RowTypeEnum.text,
            label: "Day",
            name: "day",
            rules: z.string().max(2),
          },
          {
            rowType: $enum.RowTypeEnum.text,
            label: "Month",
            name: "month",
            rules: z.number().max(2),
          },
          {
            rowType: $enum.RowTypeEnum.text,
            label: "Year",
            name: "year",
            rules: z.number().max(4),
          },
        ],
        bottomSlotName: "btnArea2",
      },
      {
        title: "",
        style: "grid grid-cols-2 gap-4 border-b border-gray-200 px-4 md:px-8 py-4",
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
        bottomSlotName: "btnArea3",
      },
    ],
  },
};
