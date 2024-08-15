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

export const QueryProductValidator = z.object({
  categoryId: z.string().optional(),
  sort: z.enum(["asc", "desc"]).optional(),
  limit: z.number().optional(),
  isTrending: z.string().optional(),
});

export type State = {
  status: "error" | "success" | undefined;
  errors?: {
    [key: string]: string[];
  };
  message?: string | null;
};
