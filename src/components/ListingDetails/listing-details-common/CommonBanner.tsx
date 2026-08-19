"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import { shareProperty } from "@/utils/share";
import { apiClient } from "@/utils/api";
import { useAuth } from "@/context/AuthContext";

interface CommonBannerProps {
  style_3?: boolean;
  propertyTitle?: string;
  propertyLocation?: string;
  price?: number;
  propertyId?: number;
}

const CommonBanner = ({
  style_3,
  propertyTitle = "The Meridian Residences",
  propertyLocation = "Worli Sea Face, Worli, Mumbai, Maharashtra 400030",
  price = 48000000,
  propertyId = 1,
}: CommonBannerProps) => {
  const { isAuthenticated } = useAuth();
  const [isFavorite, setIsFavorite] = useState(false);
  const [loadingFav, setLoadingFav] = useState(false);

  // Check if current property is favorited
  useEffect(() => {
    let isMounted = true;
    const checkFavorite = async () => {
      if (!isAuthenticated) return;
      try {
        const res = await apiClient.getFavoriteIds();
        if (isMounted && Array.isArray(res.data)) {
          setIsFavorite(res.data.includes(propertyId));
        }
      } catch (err) {
        // silent check
      }
    };
    checkFavorite();
    return () => {
      isMounted = false;
    };
  }, [isAuthenticated, propertyId]);

  const handleShare = () => {
    shareProperty({
      title: propertyTitle,
      text: `Take a look at ${propertyTitle} in ${propertyLocation} on VELMORA.`,
    });
  };

  const handleToggleFavorite = async () => {
    if (!isAuthenticated) {
      toast.info("Please log in to save properties to your favourites.", { position: "top-center" });
      const loginModalBtn = document.querySelector('[data-bs-target="#loginModal"]') as HTMLElement;
      if (loginModalBtn) loginModalBtn.click();
      return;
    }

    setLoadingFav(true);
    try {
      if (isFavorite) {
        await apiClient.removeFavorite(propertyId);
        setIsFavorite(false);
        toast.success("Removed from favourites.");
      } else {
        await apiClient.addFavorite(propertyId, {
          id: propertyId,
          title: propertyTitle,
          location: propertyLocation,
          price,
        });
        setIsFavorite(true);
        toast.success("Saved to your favourites!");
      }
    } catch (err) {
      toast.error("Unable to update favourite status.");
    } finally {
      setLoadingFav(false);
    }
  };

  // Calculate realistic estimated monthly payment in INR (20% down, 8.5% rate, 20 yr)
  const principal = price * 0.8;
  const monthlyRate = 0.085 / 12;
  const totalMonths = 240;
  const rateFactor = Math.pow(1 + monthlyRate, totalMonths);
  const calculatedEMI = Math.round((principal * monthlyRate * rateFactor) / (rateFactor - 1));

  const formatPriceClean = (val: number) => {
    if (val >= 10000000) {
      const cr = val / 10000000;
      return `₹${cr.toFixed(2).replace(/\.00$/, "")} Cr`;
    } else if (val >= 100000) {
      const lakh = val / 100000;
      return `₹${lakh.toFixed(2).replace(/\.00$/, "")} Lakh`;
    }
    return `₹${val.toLocaleString("en-IN")}`;
  };

  return (
    <div className="row align-items-center">
      <div className="col-lg-6">
        <h3 className="property-titlee font-garamond">{propertyTitle}</h3>
        <div className="d-flex flex-wrap mt-10">
          <div className={`list-type text-uppercase mt-15 me-3 ${style_3 ? "bg-white text-dark fw-500" : "text-uppercase border-20"}`}>
            FOR SALE
          </div>
          <div className="address mt-15">
            <i className="bi bi-geo-alt"></i> {propertyLocation}
          </div>
        </div>
      </div>
      <div className="col-lg-6 text-lg-end">
        <div className="d-inline-block md-mt-40">
          <div className="price color-dark fw-600 fs-24">Price: {formatPriceClean(price)}</div>
          <div className="est-price fs-18 mt-15 mb-30 md-mb-25">
            Est. Payment <span className="fw-600 color-dark">₹{calculatedEMI.toLocaleString("en-IN")}/mo*</span>
          </div>
          <ul className="style-none d-flex align-items-center action-btns">
            <li className="me-3">
              <button
                type="button"
                onClick={handleShare}
                className="btn-share border-0 bg-transparent fw-500 color-dark d-flex align-items-center cursor-pointer p-0"
                style={{ cursor: "pointer" }}
                title="Share Property"
              >
                <i className="fa-sharp fa-regular fa-share-nodes me-2"></i>
                <span>Share</span>
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={handleToggleFavorite}
                disabled={loadingFav}
                className={`d-flex align-items-center justify-content-center tran3s border-0 ${style_3 ? "" : "rounded-circle"} ${
                  isFavorite ? "bg-danger text-white shadow-sm" : "bg-light text-dark"
                }`}
                style={{ width: "42px", height: "42px", cursor: "pointer" }}
                title={isFavorite ? "Remove from favourites" : "Save to favourites"}
              >
                <i className={`${isFavorite ? "fa-solid" : "fa-light"} fa-heart`}></i>
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={handleShare}
                className={`d-flex align-items-center justify-content-center tran3s border-0 ms-2 ${style_3 ? "" : "rounded-circle"} bg-light text-dark`}
                style={{ width: "42px", height: "42px", cursor: "pointer" }}
                title="Copy Property Link"
              >
                <i className="fa-light fa-bookmark"></i>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CommonBanner;
