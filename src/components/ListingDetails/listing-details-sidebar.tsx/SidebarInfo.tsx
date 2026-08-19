"use client";
import { useState } from "react";
import Image from "next/image";
import infoAvatar from "@/assets/images/agent/img_06.jpg";
import ContactAgentModal from "@/modals/ContactAgentModal";

interface SidebarInfoProps {
  propertyTitle?: string;
  propertyLocation?: string;
  propertyId?: string | number;
  advisorName?: string;
}

const SidebarInfo = ({
  propertyTitle = "The Meridian Residences",
  propertyLocation = "Worli Sea Face, Mumbai",
  propertyId = "1",
  advisorName = "Aarav Mehta",
}: SidebarInfoProps) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <Image
        src={infoAvatar}
        alt={advisorName}
        className="lazy-img rounded-circle ms-auto me-auto mt-3 avatar object-fit-cover"
        width={90}
        height={90}
      />
      <div className="text-center mt-25">
        <h6 className="name font-garamond fs-20 m0">{advisorName}</h6>
        <p className="fs-15 text-muted mt-1 mb-2">Luxury Property Advisor</p>
        <span className="badge bg-light text-dark border fs-12 px-2 py-1">VELMORA Private Desk</span>
      </div>

      <div className="divider-line mt-30 mb-35 pt-15">
        <ul className="style-none fs-14">
          <li className="d-flex justify-content-between py-1">
            <span className="text-muted">Advisory Desk:</span>
            <span className="fw-500 color-dark">Mumbai, India</span>
          </li>
          <li className="d-flex justify-content-between py-1">
            <span className="text-muted">Availability:</span>
            <span className="fw-500 text-success">Verified Active</span>
          </li>
          <li className="d-flex justify-content-between py-1">
            <span className="text-muted">Direct Inquiry:</span>
            <span className="fw-500 color-dark">Contact via VELMORA</span>
          </li>
        </ul>
      </div>

      <button
        type="button"
        onClick={() => setModalOpen(true)}
        className="btn-nine text-uppercase rounded-3 w-100 mb-10 border-0"
        aria-label="Contact Assigned Agent"
      >
        Contact Agent
      </button>

      <ContactAgentModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        propertyTitle={propertyTitle}
        propertyLocation={propertyLocation}
        propertyId={propertyId}
        advisorName={advisorName}
      />
    </>
  );
};

export default SidebarInfo;
