"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

export const ComparisonTray: React.FC = () => {
  const [compareIds, setCompareIds] = useState<number[]>([]);

  const syncIds = () => {
    if (typeof window === "undefined") return;
    try {
      const stored = localStorage.getItem("velmora_compare_ids");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setCompareIds(parsed.map(Number).filter((n) => !isNaN(n) && n > 0));
          return;
        }
      }
      setCompareIds([]);
    } catch {}
  };

  useEffect(() => {
    syncIds();
    window.addEventListener("storage", syncIds);
    // Custom event listener for instant local sync
    window.addEventListener("velmora_compare_updated", syncIds);

    return () => {
      window.removeEventListener("storage", syncIds);
      window.removeEventListener("velmora_compare_updated", syncIds);
    };
  }, []);

  const handleClear = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("velmora_compare_ids");
      window.dispatchEvent(new Event("velmora_compare_updated"));
    }
    setCompareIds([]);
  };

  if (compareIds.length === 0) return null;

  return (
    <div
      className="position-fixed bottom-0 start-50 translate-middle-x mb-4 shadow-lg bg-dark text-white rounded-pill px-4 py-3 d-flex align-items-center gap-3 z-3"
      style={{ zIndex: 1040, maxWidth: "90vw" }}
    >
      <div className="d-flex align-items-center gap-2">
        <span className="badge bg-warning text-dark rounded-circle p-2 fw-700">
          {compareIds.length}
        </span>
        <span className="fs-14 fw-500 d-none d-sm-inline">
          {compareIds.length === 1 ? "1 Residence Selected" : `${compareIds.length} Residences Selected`}
        </span>
      </div>

      <div className="d-flex align-items-center gap-2">
        <Link
          href={`/compare?ids=${compareIds.join(",")}`}
          className="btn btn-warning btn-sm text-dark fw-600 rounded-pill px-3 fs-13"
        >
          Compare Now <i className="bi bi-arrow-right ms-1"></i>
        </Link>
        <button
          type="button"
          onClick={handleClear}
          className="btn btn-outline-light btn-sm rounded-pill px-2 fs-12"
          title="Clear comparison list"
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default ComparisonTray;
