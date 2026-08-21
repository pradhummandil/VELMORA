import React from "react";
import { Metadata } from "next";
import Wrapper from "@/layouts/Wrapper";
import HeaderOne from "@/layouts/headers/HeaderOne";
import FooterFour from "@/layouts/footers/FooterFour";
import FancyBanner from "@/components/common/FancyBanner";
import MatchWizardClient from "@/components/match/MatchWizardClient";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://velmora-house.vercel.app";

export const metadata: Metadata = {
  title: "VELMORA Match | Intelligent Property & Commute Discovery",
  description:
    "Discover luxury residences scored deterministically based on your budget, spatial layout, daily workplace commute, and living priorities.",
  alternates: {
    canonical: `${SITE_URL}/match`,
  },
  openGraph: {
    title: "VELMORA Match | Intelligent Property & Commute Discovery",
    description:
      "Discover luxury residences scored deterministically based on your budget, spatial layout, and daily commute.",
    url: `${SITE_URL}/match`,
    siteName: "VELMORA",
    type: "website",
  },
};

export default function MatchPage() {
  return (
    <Wrapper>
      <HeaderOne style={true} />
      <MatchWizardClient />
      <FancyBanner />
      <FooterFour />
    </Wrapper>
  );
}
