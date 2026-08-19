"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { toast } from "react-toastify";
import { apiClient } from "@/utils/api";
import listing_data from "@/data/inner-data/ListingData";

import featureIcon_1 from "@/assets/images/icon/icon_04.svg";
import featureIcon_2 from "@/assets/images/icon/icon_05.svg";
import featureIcon_3 from "@/assets/images/icon/icon_06.svg";
import defaultPropertyThumb from "@/assets/images/listing/img_01.jpg";

interface FavoriteRecord {
  id: number;
  propertyId: number;
  propertyData?: any;
  createdAt: string;
}

const formatPrice = (price: number) => {
  if (!price) return "Price on Request";
  if (price >= 10000000) {
    const cr = price / 10000000;
    return `₹${cr.toFixed(2).replace(/\.00$/, "")} Cr`;
  } else if (price >= 100000) {
    const lakh = price / 100000;
    return `₹${lakh.toFixed(2).replace(/\.00$/, "")} Lakh`;
  }
  return `₹${Number(price).toLocaleString("en-IN")}`;
};

const FavouriteArea = () => {
  const [favorites, setFavorites] = useState<FavoriteRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [removingId, setRemovingId] = useState<number | null>(null);

  const fetchFavorites = async () => {
    try {
      setLoading(true);
      const res = await apiClient.getFavorites();
      if (Array.isArray(res.data)) {
        setFavorites(res.data);
      }
    } catch (err) {
      console.error("Error fetching favorites:", err);
      toast.error("Failed to load saved favourites.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  const handleRemoveFavorite = async (propertyId: number) => {
    try {
      setRemovingId(propertyId);
      await apiClient.removeFavorite(propertyId);
      toast.success("Removed from favourites.");
      setFavorites((prev) => prev.filter((f) => f.propertyId !== propertyId));
    } catch (err: any) {
      toast.error("Error removing favourite.");
    } finally {
      setRemovingId(null);
    }
  };

  // Helper to get property display object
  const getPropertyDetails = (fav: FavoriteRecord) => {
    if (fav.propertyData && fav.propertyData.title) {
      return fav.propertyData;
    }
    const matched = listing_data.find((p) => p.id === fav.propertyId);
    if (matched) return matched;
    return {
      id: fav.propertyId,
      title: `Curated Residence #${fav.propertyId}`,
      address: "Worli, Mumbai, Maharashtra",
      price: 48000000,
      property_info: { sqft: 2200, bed: "3", bath: "3" },
      tag: "FOR SALE",
      tag_bg: "bg-dark text-white",
    };
  };

  if (loading) {
    return (
      <div className="text-center p-50 bg-white border-20 mb-50">
        <div className="spinner-border text-dark mb-3" role="status"></div>
        <p className="fs-16 text-muted m0">Loading your saved residences...</p>
      </div>
    );
  }

  if (favorites.length === 0) {
    return (
      <div className="text-center p-50 bg-white border-20 mb-50 shadow-sm">
        <i className="fa-light fa-heart text-muted fs-1 mb-3 d-block"></i>
        <h4 className="font-garamond mb-15">No favourite residences saved yet.</h4>
        <p className="fs-16 text-muted mb-25">Explore VELMORA curated residences and save properties for quick access.</p>
        <Link href="/listing_01" className="btn-two sm">Browse Residences</Link>
      </div>
    );
  }

  return (
    <div className="row gx-xxl-5">
      {favorites.map((fav) => {
        const item = getPropertyDetails(fav);
        const thumbImg =
          item.carousel_thumb?.[0]?.img ||
          item.thumb ||
          defaultPropertyThumb;

        return (
          <div key={fav.id} className="col-lg-4 col-md-6 d-flex mb-40">
            <div className="listing-card-one border-25 h-100 w-100 bg-white shadow-sm d-flex flex-column">
              <div className="img-gallery p-15">
                <div className="position-relative border-25 overflow-hidden">
                  <div className={`tag border-25 ${item.tag_bg || "bg-dark text-white"}`}>
                    {item.tag || "FOR SALE"}
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveFavorite(fav.propertyId)}
                    disabled={removingId === fav.propertyId}
                    className="fav-btn tran3s border-0 active bg-white text-danger shadow-sm"
                    aria-label="Remove from favourites"
                    title="Remove from favourites"
                  >
                    <i className="fa-solid fa-heart text-danger"></i>
                  </button>
                  <Link href="/listing_details_01" className="d-block">
                    <Image
                      src={thumbImg}
                      className="w-100 object-fit-cover"
                      style={{ height: "220px" }}
                      alt={item.title || "Residence"}
                    />
                  </Link>
                </div>
              </div>
              <div className="property-info p-25 d-flex flex-column flex-grow-1 justify-content-between">
                <div>
                  <Link href="/listing_details_01" className="title tran3s fw-600 fs-18 color-dark d-block mb-1">
                    {item.title}
                  </Link>
                  <div className="address fs-14 text-muted mb-3">{item.address || item.location}</div>
                  
                  {item.property_info && (
                    <ul className="style-none feature d-flex flex-wrap align-items-center justify-content-between mb-3 border-top border-bottom py-2">
                      <li className="d-flex align-items-center">
                        <Image src={featureIcon_1} alt="" className="lazy-img icon me-2" />
                        <span className="fs-14">{item.property_info.sqft} sqft</span>
                      </li>
                      <li className="d-flex align-items-center">
                        <Image src={featureIcon_2} alt="" className="lazy-img icon me-2" />
                        <span className="fs-14">{item.property_info.bed} bed</span>
                      </li>
                      <li className="d-flex align-items-center">
                        <Image src={featureIcon_3} alt="" className="lazy-img icon me-2" />
                        <span className="fs-14">{item.property_info.bath} bath</span>
                      </li>
                    </ul>
                  )}
                </div>

                <div className="pl-footer d-flex align-items-center justify-content-between pt-2">
                  <strong className="price fw-600 color-dark fs-18">
                    {formatPrice(item.price)}
                  </strong>
                  <Link href="/listing_details_01" className="btn-four rounded-circle" aria-label="View Details">
                    <i className="bi bi-arrow-up-right"></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FavouriteArea;
