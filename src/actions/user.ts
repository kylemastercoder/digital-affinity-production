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
      "https://digitalaffinity.kinde.com/api/v1/user",
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
          Authorization: `Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjliOjQ0OjNlOmNhOjA2OjM2OjNjOjZkOmVhOmUyOjczOjAxOjYzOjBiOmNiOjk1IiwidHlwIjoiSldUIn0.eyJhdWQiOlsiaHR0cHM6Ly9kaWdpdGFsYWZmaW5pdHkua2luZGUuY29tL2FwaSJdLCJhenAiOiIyOGE4NDJiYjIxNjA0MWM1YWNhNWQyZDhhMmYxMjk1NyIsImV4cCI6MTcyMzcxNjM2MywiZ3R5IjpbImNsaWVudF9jcmVkZW50aWFscyJdLCJpYXQiOjE3MjM2Mjk5NjMsImlzcyI6Imh0dHBzOi8vZGlnaXRhbGFmZmluaXR5LmtpbmRlLmNvbSIsImp0aSI6ImM5ZjQyZmE5LThmODktNGI0Zi1hZGU0LWMyN2NmZGMxM2E2NiIsInNjb3BlIjoiIiwic2NwIjpbXX0.vQo8GSlm_rX7VpStLPIb5N4azBeDZBArrXrPuAbo804BxAtymcXVyabOEUxMMArMgUj3I7LnLUhyKSYBuhPvSai2akElDALG4AUjKhrmxBVHL_jsLskBGrO8sxMyLI1q4oPTBQBAt_VgTwtVFDOz6-BI7qBpWtJwHT0arP_6HVqfb9POfZ4sjQKmApNMSUx-WV4FDiLgI5AzAnZc6eqYejuSrK7suSQsfVDsyMAl874fKj9pUcBat-Xyzdx3JnU6gR_SHcNnIJq--52t3w9LRl08US2p31lyUTcqgSTy2Xud2dFLMefinWDVoqJixqfIWbwzSn539p7849QljXFSfw`,
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
