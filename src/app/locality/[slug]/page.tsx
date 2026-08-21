import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import Wrapper from "@/layouts/Wrapper";
import HeaderOne from "@/layouts/headers/HeaderOne";
import FooterFour from "@/layouts/footers/FooterFour";
import FancyBanner from "@/components/common/FancyBanner";
import LocalityIntelligenceClient from "@/components/locality/LocalityIntelligenceClient";
import { LocalityDetailResponse } from "@/types/locality";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://velmora-house.vercel.app";

async function getLocalityData(slug: string): Promise<LocalityDetailResponse | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/locations/localities/${slug}`, {
      cache: "no-store",
    });
    if (!res.ok) {
      return null;
    }
    return await res.json();
  } catch (error) {
    console.warn("Failed to fetch locality data on server:", error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const data = await getLocalityData(params.slug);

  if (!data || !data.locality) {
    return {
      title: "Locality Not Found | VELMORA",
      description: "The requested locality market intelligence could not be found on VELMORA.",
    };
  }

  const { locality } = data;
  const title = `${locality.name}, ${locality.city} Real Estate & Market Intelligence | VELMORA`;
  const description =
    locality.description?.slice(0, 160) ||
    `Explore property price trends, valuation benchmarks, and luxury residences in ${locality.name}, ${locality.city} on VELMORA.`;

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/locality/${params.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/locality/${params.slug}`,
      siteName: "VELMORA",
      type: "website",
    },
  };
}

export default async function LocalityPage({
  params,
}: {
  params: { slug: string };
}) {
  const data = await getLocalityData(params.slug);

  if (!data || !data.locality) {
    return (
      <Wrapper>
        <HeaderOne style={true} />
        <div className="min-vh-100 d-flex align-items-center justify-content-center bg-pink-two pt-150 pb-150">
          <div className="container">
            <div className="bg-white border-20 p-5 shadow-sm text-center mx-auto" style={{ maxWidth: "560px" }}>
              <div className="rounded-circle bg-light d-inline-flex p-3 mb-3 text-warning">
                <i className="bi bi-geo-alt-fill fs-1"></i>
              </div>
              <h2 className="fw-700 color-dark fs-28 mb-2">We couldn&apos;t find that locality.</h2>
              <p className="text-muted fs-15 mb-4">
                The micro-market you are looking for is not in our verified registry yet or the URL might be invalid.
              </p>
              <div className="d-flex align-items-center justify-content-center gap-3 flex-wrap">
                <Link href="/" className="btn-two sm">
                  Return Home
                </Link>
                <Link href="/listing_01" className="btn-four sm">
                  Explore Residences
                </Link>
              </div>
            </div>
          </div>
        </div>
        <FooterFour />
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <HeaderOne style={true} />
      <LocalityIntelligenceClient
        locality={data.locality}
        properties={data.properties || []}
      />
      <FancyBanner />
      <FooterFour />
    </Wrapper>
  );
}
