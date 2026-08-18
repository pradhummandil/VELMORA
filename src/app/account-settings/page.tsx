import DashboardAccountSetting from "@/components/dashboard/account-settings";
import Wrapper from "@/layouts/Wrapper";

export const metadata = {
   title: "Account Settings HOZN - Real Estate React Next js",
};

const AccountSettingsPage = () => {
   return (
      <Wrapper>
         <DashboardAccountSetting />
      </Wrapper>
   );
};

export default AccountSettingsPage;
