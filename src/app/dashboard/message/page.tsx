import DashboardMessage from "@/components/dashboard/message";
import Wrapper from "@/layouts/Wrapper";

export const metadata = {
   title: "Messages | VELMORA",
};
const index = () => {
   return (
      <Wrapper>
         <DashboardMessage />
      </Wrapper>
   )
}

export default index