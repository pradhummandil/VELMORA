"use client"
import Image, { StaticImageData } from "next/image"
import NiceSelect from "@/ui/NiceSelect"
import RecentMessage from "./RecentMessage"
import DashboardHeaderTwo from "@/layouts/headers/dashboard/DashboardHeaderTwo"

import icon_1 from "@/assets/images/dashboard/icon/icon_12.svg"
import icon_2 from "@/assets/images/dashboard/icon/icon_13.svg"
import icon_3 from "@/assets/images/dashboard/icon/icon_14.svg"
import icon_4 from "@/assets/images/dashboard/icon/icon_15.svg"
import DashboardChart from "./DashboardChart"
import { useAuth } from "@/context/AuthContext"

interface DataType {
   id: number;
   icon: StaticImageData;
   title: string;
   value: string;
   class_name?: string;
}

const dashboard_card_data: DataType[] = [
   {
      id: 1,
      icon: icon_1,
      title: "My Properties",
      value: "0",
      class_name: "skew-none",
   },
   {
      id: 2,
      icon: icon_2,
      title: "Active Inquiries",
      value: "0",
   },
   {
      id: 3,
      icon: icon_3,
      title: "Portfolio Views",
      value: "0",
   },
   {
      id: 4,
      icon: icon_4,
      title: "Saved Favourites",
      value: "0",
   },
]

const DashboardBody = () => {
   const { user } = useAuth();
   const selectHandler = (e: any) => { };

   return (
      <div className="dashboard-body">
         <div className="position-relative">
            <DashboardHeaderTwo title="Dashboard" />

            <div className="d-flex align-items-center justify-content-between mb-25 mt-10">
               <div>
                  <h3 className="main-title m0">Welcome, {user?.name || "Member"}</h3>
                  <p className="fs-15 text-muted m0 pt-1">Manage your VELMORA portfolio, inquiries, and saved luxury residences.</p>
               </div>
            </div>

            <div className="bg-white border-20">
               <div className="row">
                  {dashboard_card_data.map((item) => (
                     <div key={item.id} className="col-lg-3 col-6">
                        <div className={`dash-card-one bg-white border-30 position-relative mb-15 ${item.class_name}`}>
                           <div className="d-sm-flex align-items-center justify-content-between">
                              <div className="icon rounded-circle d-flex align-items-center justify-content-center order-sm-1"><Image src={item.icon} alt="" className="lazy-img" /></div>
                              <div className="order-sm-0">
                                 <span>{item.title}</span>
                                 <div className="value fw-500">{item.value}</div>
                              </div>
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
            </div>

            <div className="row gx-xxl-5 d-flex pt-15 lg-pt-10">
               <div className="col-xl-7 col-lg-6 d-flex flex-column">
                  <div className="user-activity-chart bg-white border-20 mt-30 h-100">
                     <div className="d-flex align-items-center justify-content-between plr">
                        <h5 className="dash-title-two">Property View</h5>
                        <div className="short-filter d-flex align-items-center">
                           <div className="fs-16 me-2">Short by:</div>
                           <NiceSelect className="nice-select fw-normal"
                              options={[
                                 { value: "1", text: "Weekly" },
                                 { value: "2", text: "Daily" },
                                 { value: "3", text: "Monthly" },
                              ]}
                              defaultCurrent={0}
                              onChange={selectHandler}
                              name=""
                              placeholder="" />
                        </div>
                     </div>
                     <div className="plr mt-50">
                        <div className="chart-wrapper">
                           <DashboardChart />
                        </div>
                     </div>
                  </div>
               </div>

               <div className="col-xl-5 col-lg-6 d-flex">
                  <div className="recent-job-tab bg-white border-20 mt-30 plr w-100">
                     <h5 className="dash-title-two">Recent Message</h5>
                     <RecentMessage/>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default DashboardBody
