import React from "react";
import { Metadata } from "next";
import Wrapper from "@/layouts/Wrapper";
import HeaderOne from "@/layouts/headers/HeaderOne";
import FooterFour from "@/layouts/footers/FooterFour";
import FancyBanner from "@/components/common/FancyBanner";
import ReraTrustClient from "@/components/rera/ReraTrustClient";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://velmora-house.vercel.app";

export const metadata: Metadata = {
  title: "RERA Property Verification & Trust Center | VELMORA",
  description:
    "Understand how VELMORA handles RERA compliance, official state regulatory authority directories, verified badges, and authoritative property audits under India's Real Estate (Regulation and Development) Act, 2016.",
  alternates: {
    canonical: `${SITE_URL}/rera-trust`,
  },
  openGraph: {
    title: "RERA Property Verification & Trust Center | VELMORA",
    description:
      "Understand how VELMORA handles RERA compliance, official state regulatory authority directories, and verified badges.",
    url: `${SITE_URL}/rera-trust`,
    siteName: "VELMORA",
    type: "website",
  },
};

export default function ReraTrustPage() {
  return (
    <Wrapper>
      <HeaderOne style={true} />
      <ReraTrustClient />
      <FancyBanner />
      <FooterFour />
    </Wrapper>
  );
}
