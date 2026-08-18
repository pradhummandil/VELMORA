import DashboardReview from "@/components/dashboard/review";
import Wrapper from "@/layouts/Wrapper";

export const metadata = {
   title: "My Reviews | VELMORA",
};
const index = () => {
   return (
      <Wrapper>
         <DashboardReview />
      </Wrapper>
   )
}

export default index