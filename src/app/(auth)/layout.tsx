import AvatarCircles from "../../components/magicui/avatar-circles";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const avatarUrls = [
  "https://avatars.githubusercontent.com/u/16860528",
  "https://avatars.githubusercontent.com/u/20110627",
  "https://avatars.githubusercontent.com/u/106103625",
  "https://avatars.githubusercontent.com/u/59228569",
];


const AuthContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
    {children}
    </>
  );
};

export default AuthContainer;
