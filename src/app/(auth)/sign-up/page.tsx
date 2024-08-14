import React from "react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import EmailRegister from "@/components/email-register";
import { RegisterLink } from "@kinde-oss/kinde-auth-nextjs/server";
import { getConnections } from "@/actions/misc";
import Image from "next/image";

const SignIn = async (props: {
  searchParams: { orgCode?: string; team_id?: string };
}) => {
  const connections = await getConnections();
  const emailConnectionId = connections?.find(
    (conn: any) => conn.strategy === "email:otp"
  )?.id;
  return (
    <div className="h-screen flex items-center">
      <Card className="mx-auto w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">Create your account</CardTitle>
          <CardDescription>
            Provide all the necessary details to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <EmailRegister
              emailConnectionId={emailConnectionId}
              orgCode={props.searchParams.orgCode}
              teamId={props.searchParams.team_id}
            />
            <div className="flex items-center gap-4 justify-center">
              <div className="flex-1 border-t border-gray-500"></div>
              <span>Or continue with</span>
              <div className="flex-1 border-t border-gray-500"></div>
            </div>
            <div className="flex flex-wrap gap-2 w-full">
              {connections
                ?.filter((conn: any) => conn.strategy.includes("oauth2"))
                ?.map((connection: any) => (
                  <RegisterLink
                    className="w-full flex-1"
                    key={connection.id}
                    orgCode={props.searchParams.orgCode}
                    postLoginRedirectURL={`/`}
                    authUrlParams={{
                      connection_id: connection.id,
                    }}
                  >
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="outline" className="w-full">
                            <SignUpButtonIcon strategy={connection.strategy} />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          {connection.display_name}
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </RegisterLink>
                ))}
            </div>
          </div>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/sign-in" className="underline">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const SignUpButtonIcon = (props: { strategy: string }) => {
  switch (props.strategy) {
    case "oauth2:github":
      return <Image src="/github.png" alt="Github" width="20" height="20" />;
    case "oauth2:google":
      return <Image src="/google.png" alt="Google" width="20" height="20" />;
    default:
      return null;
  }
};

export default SignIn;
