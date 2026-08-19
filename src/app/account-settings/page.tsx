import DashboardAccountSetting from "@/components/dashboard/account-settings";
import Wrapper from "@/layouts/Wrapper";
import AuthGuard from "@/components/auth/AuthGuard";

export const metadata = {
   title: "Account Settings | VELMORA",
};

const AccountSettingsPage = () => {
   return (
      <AuthGuard>
         <Wrapper>
            <DashboardAccountSetting />
         </Wrapper>
      </AuthGuard>
   );
};

export default AccountSettingsPage;

