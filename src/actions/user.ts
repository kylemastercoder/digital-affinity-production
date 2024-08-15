"use server";
import db from "@/lib/db";
import { State, UserSchema } from "@/lib/validators";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import axios from "axios";

export const createUser = async (
  email: string,
  familyName: string,
  givenName: string,
  orgCode: string
) => {
  try {
    const response = await axios.post(
      `${process.env.KINDE_ISSUER_URL}/api/v1/user`,
      {
        profile: {
          given_name: givenName,
          family_name: familyName,
        },
        organization_code: orgCode,
        identities: [
          {
            type: "email",
            details: {
              email: email,
            },
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${process.env.KINDE_ACCESS_TOKEN}`,
        },
      }
    );

    return response.data;
  } catch (error: any) {
    console.error("Error:", error);
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data?.message || "Registration failed. Please try again."
      );
    } else {
      console.log(error);
      throw new Error("An unexpected error occurred.");
    }
  }
};

export const updateUser = async (prevState: any, formData: FormData) => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    throw new Error("No user found.");
  }

  const validatedFields = UserSchema.safeParse({
    firstName: formData.get("firstName") as string,
    lastName: formData.get("lastName") as string,
  });

  if (!validatedFields.success) {
    const state: State = {
      status: "error",
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Oops, I think there is a mistake with your inputs.",
    };

    return state;
  }

  await db.user.update({
    where: {
      id: user.id,
    },
    data: {
      firstName: validatedFields.data.firstName,
      lastName: validatedFields.data.lastName,
    },
  });

  const state: State = {
    status: "success",
    message: "Your data have been updated.",
  };

  return state;
};
