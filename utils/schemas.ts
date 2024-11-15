import { z } from "zod";

const resgisterSchema = [
  z.object({
    name: z.string(),
    email: z.string().email(),
    user_name: z
      .string()
      .min(8)
      .max(50)
      .regex(
        /^[a-zA-Z0-9_]+$/,
        "Username must not contain spaces or special characters"
      ),
  }),
  z
    .object({
      password: z.string().min(8).max(50),
      password_confirmation: z.string().min(8).max(50),
    })
    .refine(
      (values) => {
        return values.password === values.password_confirmation;
      },
      {
        message: "Passwords must match!",
        path: ["confirmPassword"],
      }
    ),
  z.object({
    favorite_genre: z
      .array(z.string())
      .min(1, { message: "Please choose a genre" }),
  }),
  z.object({
    code: z.array(z.coerce.string()).length(6, { message: "Invalid OTP" }),
  }),
];

export const $schema = {
  resgisterSchema,
};
