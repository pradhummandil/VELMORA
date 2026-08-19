import Image from "next/image"
import Link from "next/link"

import commentImg_1 from "@/assets/images/blog/avatar_01.jpg"
import commentImg_2 from "@/assets/images/blog/avatar_02.jpg"
import commentImg_3 from "@/assets/images/blog/avatar_03.jpg"

const BlogComment = () => {
   return (
      <div className="blog-comment-area">
         <h3 className="blog-inner-title pb-35 font-garamond">3 Insights & Comments</h3>
         <div className="comment position-relative d-flex">
            <Image src={commentImg_1} alt="" className="lazy-img user-avatar rounded-circle" />
            <div className="comment-text">
               <div className="name fw-500">Vikram Malhotra</div>
               <div className="date">18 Aug, 2024, 4:10pm</div>
               <p>The RERA compliance framework discussed here is essential for any high-value residential acquisition in Mumbai and NCR.</p>
               <Link href="#" className="reply-btn tran3s">Reply</Link>
               <div className="comment position-relative reply-comment d-flex">
                  <Image src={commentImg_2} alt="" className="lazy-img user-avatar rounded-circle" />
                  <div className="comment-text">
                     <div className="name fw-500">Aarav Mehta</div>
                     <div className="date">19 Aug, 2024, 11:20am</div>
                     <p>Absolutely Vikram. Verifying title clearance and escrow compliance prior to agreement registration safeguards buyer equity from day one.</p>
                     <Link href="#" className="reply-btn tran3s">Reply</Link>
                  </div>
               </div>
            </div>
         </div>
         <div className="comment position-relative d-flex">
            <Image src={commentImg_3} alt="" className="lazy-img user-avatar rounded-circle" />
            <div className="comment-text">
               <div className="name fw-500">Pooja Hegde</div>
               <div className="date">15 Aug, 2024, 2:30pm</div>
               <p>The insights on North Goa freehold titles versus leasehold structures provide immense clarity for second-home buyers looking at Assagao and Anjuna.</p>
               <Link href="#" className="reply-btn tran3s">Reply</Link>
            </div>
         </div>
      </div>
   )
}

export default BlogComment
