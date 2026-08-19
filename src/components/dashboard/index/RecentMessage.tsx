import Link from "next/link";

const RecentMessage = () => {
   return (
      <div className="message-wrapper py-4 px-3 text-center">
         <div className="py-4">
            <i className="fa-light fa-envelope-open text-muted fs-1 mb-3 d-block"></i>
            <p className="fs-16 fw-500 color-dark mb-10">No property inquiries or messages yet.</p>
            <p className="fs-14 text-muted mb-20">When you connect with a VELMORA private advisor, your correspondence will appear here.</p>
            <Link href="/contact" className="btn-two sm">Contact Advisor</Link>
         </div>
      </div>
   );
};

export default RecentMessage;

