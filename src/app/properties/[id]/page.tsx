import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import Wrapper from "@/layouts/Wrapper";
import HeaderOne from "@/layouts/headers/HeaderOne";
import FooterFour from "@/layouts/footers/FooterFour";
import FancyBanner from "@/components/common/FancyBanner";
import PropertyDecisionClient from "@/components/property-details/PropertyDecisionClient";
import { PropertyRecord } from "@/types/property";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://velmora-house.vercel.app";

async function getPropertyData(id: string): Promise<PropertyRecord | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/properties/${id}`, {
      cache: "no-store",
    });
    if (!res.ok) {
      return null;
    }
    return await res.json();
  } catch (error) {
    console.warn("Failed to fetch property details on server:", error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const property = await getPropertyData(params.id);

  if (!property) {
    return {
      title: "Property Not Found | VELMORA",
      description: "The requested luxury residence could not be found on VELMORA.",
    };
  }

  const title = `${property.title} | VELMORA Luxury Real Estate`;
  const description =
    property.description?.slice(0, 160) ||
    `Explore ${property.title} in ${property.locality || property.location || property.city} on VELMORA - India's intelligent luxury property discovery platform.`;

  const primaryImage =
    Array.isArray(property.images) && property.images.length > 0
      ? property.images[0]
      : `${SITE_URL}/assets/images/logo/logo_01.svg`;

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/properties/${params.id}`,
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/properties/${params.id}`,
      siteName: "VELMORA",
      images: [
        {
          url: primaryImage,
          width: 1200,
          height: 630,
          alt: property.title,
        },
      ],
      type: "website",
    },
  };
}

export default async function PropertyDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const property = await getPropertyData(params.id);

  if (!property) {
    return (
      <Wrapper>
        <HeaderOne style={true} />
        <div className="min-vh-100 d-flex align-items-center justify-content-center bg-pink-two pt-150 pb-150">
          <div className="container">
            <div className="bg-white border-20 p-5 shadow-sm text-center mx-auto" style={{ maxWidth: "560px" }}>
              <div className="rounded-circle bg-light d-inline-flex p-3 mb-3 text-warning">
                <i className="bi bi-building-x fs-1"></i>
              </div>
              <h2 className="fw-700 color-dark fs-28 mb-2">We couldn&apos;t find that residence.</h2>
              <p className="text-muted fs-15 mb-4">
                The property you are looking for may have been archived, sold, or the URL might be invalid.
              </p>
              <div className="d-flex align-items-center justify-content-center gap-3 flex-wrap">
                <Link href="/" className="btn-two sm">
                  Return Home
                </Link>
                <Link href="/listing_01" className="btn-four sm">
                  Explore Properties
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
      <PropertyDecisionClient property={property} />
      <FancyBanner />
      <FooterFour />
    </Wrapper>
  );
}
