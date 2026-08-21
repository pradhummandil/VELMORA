import React from "react";
import { Metadata } from "next";
import Wrapper from "@/layouts/Wrapper";
import HeaderOne from "@/layouts/headers/HeaderOne";
import FooterFour from "@/layouts/footers/FooterFour";
import FancyBanner from "@/components/common/FancyBanner";
import DynamicCompareClient from "@/components/compare/DynamicCompareClient";

export const metadata: Metadata = {
  title: "Compare Luxury Residences | VELMORA",
  description: "Direct side-by-side comparison of luxury residences, price benchmarks, and living indices.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function ComparePage() {
  return (
    <Wrapper>
      <HeaderOne style={true} />
      <DynamicCompareClient />
      <FancyBanner />
      <FooterFour />
    </Wrapper>
  );
}