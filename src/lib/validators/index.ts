import * as z from "zod";

export const UserSchema = z.object({
  firstName: z
    .string()
    .min(1, { message: "First name is required." })
    .or(z.literal(""))
    .optional(),
  lastName: z
    .string()
    .min(1, { message: "Last name is required." })
    .or(z.literal(""))
    .optional(),
});

export type State = {
  status: "error" | "success" | undefined;
  errors?: {
    [key: string]: string[];
  };
  message?: string | null;
};
