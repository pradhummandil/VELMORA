import Error from "@/components/inner-pages/error";
import Wrapper from "@/layouts/Wrapper";

export const metadata = {
   title: "404 Error | VELMORA",
};
const index = () => {
   return (
      <Wrapper>
         <Error />
      </Wrapper>
   )
}

export default index