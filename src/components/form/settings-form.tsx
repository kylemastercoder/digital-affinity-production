"use client";

import React, { useEffect } from "react";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import SubmitButton from "../submit-button";
import { useFormState } from "react-dom";
import { updateUser } from "@/actions/user";
import { State } from "@/lib/validators";
import { toast } from "sonner";

interface SettingsFormProps {
  firstName: string;
  lastName: string;
  email: string;
}

const SettingsForm = ({ firstName, lastName, email }: SettingsFormProps) => {
  const initialState: State = {message: '', status: undefined, errors: {}};
  const [state, formAction] = useFormState(updateUser, initialState);

  useEffect(() => {
    if (state?.status === "error") {
      toast.error(state.message);
    }else if(state?.status === "success"){
      toast.success(state.message);
    }
  }, [state]);

  return (
    <form action={formAction}>
      <CardHeader>
        <CardTitle>Settings</CardTitle>
        <CardDescription>
          Here you will find settings regarding your account.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-y-5">
        <div className="flex flex-col gap-y-2">
          <Label>First Name</Label>
          <Input
            name="firstName"
            defaultValue={firstName}
            type="text"
            placeholder="Juan"
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <Label>Last Name</Label>
          <Input
            name="lastName"
            defaultValue={lastName}
            type="text"
            placeholder="Dela Cruz"
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <Label>Email Address</Label>
          <Input
            name="email"
            type="email"
            placeholder="someone@example.com"
            disabled
            defaultValue={email}
          />
        </div>
      </CardContent>
      <CardFooter>
        <SubmitButton title="Save Changes" />
      </CardFooter>
    </form>
  );
};

export default SettingsForm;
