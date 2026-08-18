import PropertyList from "@/components/dashboard/properties-list";
import Wrapper from "@/layouts/Wrapper";

export const metadata = {
   title: "My Properties | VELMORA",
};
const index = () => {
   return (
      <Wrapper>
         <PropertyList />
      </Wrapper>
   )
}

export default index