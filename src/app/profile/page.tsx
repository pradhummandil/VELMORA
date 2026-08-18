import DashboardProfile from "@/components/dashboard/profile";
import Wrapper from "@/layouts/Wrapper";

export const metadata = {
   title: "Profile HOZN - Real Estate React Next js",
};

const ProfilePage = () => {
   return (
      <Wrapper>
         <DashboardProfile />
      </Wrapper>
   );
};

export default ProfilePage;
