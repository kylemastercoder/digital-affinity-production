/* eslint-disable @next/next/no-img-element */
"use client";

import Confetti, { ConfettiRef } from "@/components/magicui/confetti";
import Marquee from "@/components/magicui/marquee";
import ShinyButton from "@/components/magicui/shiny-button";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import { ShootingStars } from "@/components/motion/shooting-stars";
import { StarsBackground } from "@/components/motion/stars-background";
import PricingCard from "@/components/pricing-card";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowDownToLine, CheckCircle, HeartHandshake, Leaf } from "lucide-react";
import Link from "next/link";
import React, { useRef, useState } from "react";

const perks = [
  {
    name: "Instant Delivery",
    Icon: ArrowDownToLine,
    description:
      "Get your assets delivered to your email in seconds and download them right away.",
  },
  {
    name: "Guaranteed Quality",
    Icon: CheckCircle,
    description:
      "Every asset on our platform is verified by our team to ensure our highest quality standards.",
  },
  {
    name: "For the Planet",
    Icon: Leaf,
    description:
      "We've pledged 1% of sales to the preservation and restoration of the natural environment.",
  },
];

const plan = [
  {
    name: "Basic",
    description:
      "Create simple web application or landing page and fix issues.",
    priceInPeso: "₱10,000",
    priceInDollar: "$200",
    perks: [
      {
        delivery: "7-day",
        revision: "3 revisions",
      },
    ],
    features: [
      "3 pages",
      "Design customization",
      "Content upload",
      "Responsive design",
      "Source code",
      "Detailed code comments",
      "Basic support",
    ],
  },
  {
    name: "Standard",
    description: "Create standard web application with minimal features.",
    priceInPeso: "₱30,000",
    priceInDollar: "$500",
    perks: [
      {
        delivery: "20-day",
        revision: "5 revisions",
      },
    ],
    features: [
      "10 pages",
      "Design customization",
      "Content upload",
      "Responsive design",
      "Source code",
      "Detailed code comments",
      "Priority support",
    ],
  },
  {
    name: "Premium",
    description:
      "Create a full stack web app using Next JS, Laravel or your preferred stack with hosting.",
    priceInPeso: "₱60,000",
    priceInDollar: "$1,000",
    perks: [
      {
        delivery: "31-day",
        revision: "Unlimited revisions",
      },
    ],
    features: [
      "Unlimited pages",
      "Design customization",
      "Content upload",
      "Responsive design",
      "Source code",
      "Detailed code comments",
      "24/7 dedicated support",
    ],
  },
];

const reviews = [
  {
    name: "Jack",
    username: "@jack",
    body: "I've never seen anything like this before. It's amazing. I love it.",
    img: "https://avatar.vercel.sh/jack",
  },
  {
    name: "Jill",
    username: "@jill",
    body: "I don't know what to say. I'm speechless. This is amazing.",
    img: "https://avatar.vercel.sh/jill",
  },
  {
    name: "John",
    username: "@john",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/john",
  },
  {
    name: "Jane",
    username: "@jane",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/jane",
  },
  {
    name: "Jenny",
    username: "@jenny",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/jenny",
  },
  {
    name: "James",
    username: "@james",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/james",
  },
];

const Home = () => {
  const confettiRef = useRef<ConfettiRef>(null);
  const [selectedPlan, setSelectedPlan] = useState("Basic");

  const firstRow = reviews.slice(0, reviews.length / 2);
  const secondRow = reviews.slice(reviews.length / 2);

  const handleSelectPlan = (name: string) => {
    setSelectedPlan(name);
  };

  return (
    <>
      <MaxWidthWrapper>
        <div className="py-20 relative mx-auto text-center flex flex-col items-center max-w-3xl">
          <h1 className="text-4xl font-bold relative z-10 tracking-tight text-gray-900 dark:text-gray-50 sm:text-6xl">
            Your marketplace for high-quality{" "}
            <span className="text-blue-500">digital products & services</span>.
          </h1>
          <p className="mt-6 text-lg relative z-10 max-w-prose text-muted-foreground">
            Welcome to Digital Affinity. Every asset on our platform is verified
            by our team to ensure our highest quality standards.
          </p>
          <div className="flex relative z-10 flex-col sm:flex-row gap-4 mt-6">
            <Link
              href={`/products?query=trending`}
              className={buttonVariants()}
            >
              Browse Trending
            </Link>
            <Link
              href={`/products`}
              className={buttonVariants({ variant: "outline" })}
            >
              Our quality promise &rarr;
            </Link>
          </div>
          <ShootingStars />
          <StarsBackground />
        </div>
      </MaxWidthWrapper>

      <section>
        <MaxWidthWrapper className="py-20">
          <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-0">
            {perks.map((perk) => (
              <div
                key={perk.name}
                className="text-center md:flex md:items-start md:text-left lg:block lg:text-center"
              >
                <div className="md:flex-shrink-0 flex justify-center">
                  <div className="h-16 w-16 flex items-center justify-center rounded-full dark:bg-blue-600 bg-blue-100 text-blue-900 dark:text-blue-200">
                    {<perk.Icon className="w-1/3 h-1/3" />}
                  </div>
                </div>

                <div className="mt-6 md:ml-4 md:mt-0 lg:ml-0 lg:mt-6">
                  <h3 className="text-base font-medium text-gray-900 dark:text-gray-50">
                    {perk.name}
                  </h3>
                  <p className="mt-3 text-sm text-muted-foreground">
                    {perk.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </MaxWidthWrapper>
        <div className="relative">
          <div
            className="relative -z-[2] mx-auto h-[50rem] overflow-hidden my-[-20.8rem]"
            style={{
              backgroundImage:
                "radial-gradient(circle at bottom center, #ffbd7a, transparent 70%)",
              WebkitMaskImage:
                "radial-gradient(ellipse at center center, #000, transparent 80%)",
              maskImage:
                "radial-gradient(ellipse at center center, #000, transparent 80%)",
            }}
          >
            <div
              className="absolute inset-0 h-full w-full opacity-40"
              style={{
                backgroundImage:
                  "radial-gradient(circle at bottom center, #000, transparent 70%)",
              }}
            ></div>
            <div
              className="absolute -left-1/2 top-1/2 aspect-[1/0.7] w-[200%] rounded-t-full border-t border-black bg-black"
              style={{
                backgroundImage:
                  "radial-gradient(circle at bottom center, #ffbd7a, transparent 70%)",
              }}
            ></div>
          </div>
        </div>
      </section>

      {/* PRICING PLAN */}
      <MaxWidthWrapper className="py-20 relative">
        <p className="text-center text-2xl font-bold">Pricing Plan</p>
        <h3 className="text-center text-5xl font-black mt-2">
          Simple pricing for everyone.
        </h3>
        <p className="text-center text-lg font-semibold text-muted-foreground mt-5">
          I specialize in building advanced{" "}
          <span className="text-blue-600">web applications</span> using a robust
          tech stack that includes React.js, Next.js, PHP, and Node.js. With a
          focus on delivering high-quality, scalable solutions, I combine these
          cutting-edge technologies to create dynamic and responsive web
          applications tailored to your specific requirements.
        </p>
        <ShinyButton
          text="✨ Price Negotiable"
          className="flex items-center justify-center text-center mt-5 mx-auto mb-10"
        />
        <Confetti
          ref={confettiRef}
          className="absolute left-0 top-0 z-0 size-full"
          onMouseEnter={() => {
            confettiRef.current?.fire({});
          }}
        />
        <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-10 lg:gap-y-0">
          {plan.map((item) => (
            <PricingCard
              key={item.name}
              data={item}
              selectedPlan={selectedPlan}
              handleSelectPlan={handleSelectPlan}
            />
          ))}
        </div>
      </MaxWidthWrapper>

      <div className="mt-3">
        <div className="py-20">
          <div className="flex w-full flex-col items-center justify-center">
            <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
              <Marquee pauseOnHover className="[--duration:20s]">
                {firstRow.map((review) => (
                  <ReviewCard key={review.username} {...review} />
                ))}
              </Marquee>
              <Marquee pauseOnHover className="[--duration:20s]">
                {secondRow.map((review) => (
                  <ReviewCard key={review.username} {...review} />
                ))}
              </Marquee>
              <div className="absolute bottom-0 z-40">
                <div className="flex flex-col items-center justify-center">
                  <div className="border p-3 rounded-3xl mb-3 backdrop-blur">
                    <HeartHandshake size={50} />
                  </div>
                  <p className="text-white font-black text-3xl">
                    Stop wasting time on design.
                  </p>
                  <p className="text-white mt-2">
                    Purchase our digital assets and high-quality services.
                  </p>
                </div>
              </div>
              <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-black"></div>
              <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-black"></div>
              <div className="absolute inset-x-0 bottom-0 h-[10rem] bg-gradient-to-b from-transparent to-black"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const ReviewCard = ({
  img,
  name,
  username,
  body,
}: {
  img: string;
  name: string;
  username: string;
  body: string;
}) => {
  return (
    <figure
      className={cn(
        "relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <img className="rounded-full" width="32" height="32" alt="" src={img} />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {name}
          </figcaption>
          <p className="text-xs font-medium dark:text-white/40">{username}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm">{body}</blockquote>
    </figure>
  );
};

export default Home;
