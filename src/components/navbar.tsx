import Link from "next/link";
import NavItems from "./nav-items";
import { buttonVariants } from "./ui/button";
import Cart from "./cart";
import UserAccount from "./user-account";
import Image from "next/image";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { cn } from "@/lib/utils";
import db from "@/lib/db";
import { redirect } from "next/navigation";

async function getData(userId: string) {
  const data = await db.user.findUnique({
    where: {
      id: userId,
    },
  });

  return data;
}

const Navbar = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || !user?.id) {
    redirect("/sign-in");
  }
  
  const data = await getData(user?.id as string);

  if (!data) {
    await db.user.create({
      data: {
        id: user.id,
        email: user.email!,
        firstName: user.given_name!,
        lastName: user.family_name!,
        image: user.picture,
        connectedAccountId: "email:otp",
      },
    });
  }

  const fullname = data?.firstName + " " + data?.lastName;

  return (
    <div className="sticky w-full z-50 top-0 inset-x-0 h-16">
      <header className="relative border-b w-full backdrop-blur">
        <div className="max-w-7xl mx-auto px-2.5 md:px-20">
          <div className="flex h-16 items-center">
            <div className="ml-4 flex lg:ml-0">
              <Link href="/">
                <Image
                  src="/logo.png"
                  alt="Digital Affinity"
                  width={50}
                  height={50}
                />
              </Link>
            </div>
            <div className="hidden z-50 lg:ml-8 lg:block lg:self-stretch">
              <NavItems />
            </div>

            <div className="ml-auto flex items-center">
              <div className="flex items-center justify-end space-x-6">
                {user ? (
                  <UserAccount
                    name={fullname as string}
                    email={data?.email as string}
                    image={
                      data?.image ??
                      `https://avatar.vercel.sh/rauchg/${data?.firstName}`
                    }
                  />
                ) : (
                  <Link
                    href="/sign-in"
                    className={cn(
                      "bg-primary",
                      buttonVariants({
                        variant: "default",
                        size: "sm",
                      })
                    )}
                  >
                    Sign In
                  </Link>
                )}

                {user && (
                  <span
                    className="h-6 w-px bg-gray-200 dark:bg-gray-600"
                    aria-hidden="true"
                  />
                )}

                {!user && (
                  <div className="flex lg:ml-6">
                    <span
                      className="h-6 w-px bg-gray-200 dark:bg-gray-600"
                      aria-hidden="true"
                    />
                  </div>
                )}

                <div className="ml-4 flow-root lg:ml-6">
                  <Cart />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
