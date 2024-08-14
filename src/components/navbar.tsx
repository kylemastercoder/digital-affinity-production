import Link from "next/link";
import NavItems from "./nav-items";
import { buttonVariants } from "./ui/button";
import Cart from "./cart";
import UserAccount from "./user-account";
import Image from "next/image";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { cn } from "@/lib/utils";

const Navbar = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const fullname = user?.given_name + " " + user?.family_name;
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
                    email={user.email as string}
                    image={
                      user.picture ??
                      `https://avatar.vercel.sh/rauchg/${user.given_name}`
                    }
                  />
                ) : (
                  <Link
                    href="/sign-in"
                    className={cn("bg-primary", buttonVariants({
                      variant: "default",
                      size: "sm",
                    }))}
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
