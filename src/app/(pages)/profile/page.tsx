import SettingsForm from "@/components/form/settings-form";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import { Card } from "@/components/ui/card";
import db from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import React from "react";
import { unstable_noStore as noStore } from "next/cache";

async function getData(userId: string) {
  const data = await db.user.findUnique({
    where: {
      id: userId,
    },
  });

  return data;
}

const Profile = async () => {
  noStore();
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) {
    throw new Error("No user found.");
  }
  const data = await getData(user.id as string);
  return (
    <MaxWidthWrapper>
      <div className="py-20">
        <Card>
          <SettingsForm
            firstName={data?.firstName as string}
            lastName={data?.lastName as string}
            email={data?.email as string}
          />
        </Card>
      </div>
    </MaxWidthWrapper>
  );
};

export default Profile;
