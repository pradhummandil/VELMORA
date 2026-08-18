import DashboardAccountSetting from "@/components/dashboard/account-settings";
import Wrapper from "@/layouts/Wrapper";

export const metadata = {
   title: "Account Settings | VELMORA",
};
const index = () => {
   return (
      <Wrapper>
         <DashboardAccountSetting />
      </Wrapper>
   )
}

export default index