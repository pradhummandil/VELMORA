import DashboardProfile from "@/components/dashboard/profile";
import Wrapper from "@/layouts/Wrapper";
import AuthGuard from "@/components/auth/AuthGuard";

export const metadata = {
   title: "User Profile | VELMORA",
};

const ProfilePage = () => {
   return (
      <AuthGuard>
         <Wrapper>
            <DashboardProfile />
         </Wrapper>
      </AuthGuard>
   );
};

export default ProfilePage;

