import { Suspense } from "react"
import FooterFour from "@/layouts/footers/FooterFour"
import ListingOneArea from "./ListingOneArea"
import FancyBanner from "@/components/common/FancyBanner"
import HeaderOne from "@/layouts/headers/HeaderOne"

const ListingOne = () => {
   return (
      <>
         <HeaderOne style={true} />
         <Suspense fallback={<div className="text-center p-5">Loading residences...</div>}>
            <ListingOneArea />
         </Suspense>
         <FancyBanner />
         <FooterFour />
      </>
   )
}

export default ListingOne;
