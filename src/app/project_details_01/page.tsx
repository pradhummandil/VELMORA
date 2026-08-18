import ProjectDetails from "@/components/inner-pages/projects/project-details";
import Wrapper from "@/layouts/Wrapper";

export const metadata = {
   title: "Project Details | VELMORA",
};
const index = () => {
   return (
      <Wrapper>
         <ProjectDetails />
      </Wrapper>
   )
}

export default index