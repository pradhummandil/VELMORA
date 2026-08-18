import DashboardProfile from "@/components/dashboard/profile";
import Wrapper from "@/layouts/Wrapper";

export const metadata = {
   title: "User Profile | VELMORA",
};

const ProfilePage = () => {
   return (
      <Wrapper>
         <DashboardProfile />
      </Wrapper>
   );
};

export default ProfilePage;
