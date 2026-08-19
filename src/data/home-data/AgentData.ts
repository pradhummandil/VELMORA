import { StaticImageData } from "next/image";

import agentThumb_1 from "@/assets/images/agent/img_01.jpg";
import agentThumb_2 from "@/assets/images/agent/img_02.jpg";
import agentThumb_3 from "@/assets/images/agent/img_03.jpg";
import agentThumb_4 from "@/assets/images/agent/img_04.jpg";
import agentThumb_5 from "@/assets/images/agent/img_05.jpg";

interface DataType {
   id: number;
   page: string;
   thumb: StaticImageData;
   title: string;
   desc: string;
}

const agent_data: DataType[] = [
   {
      id: 1,
      page: "home_1",
      thumb: agentThumb_1,
      title: "Aarav Mehta",
      desc: "Luxury Property Advisor",
   },
   {
      id: 2,
      page: "home_1",
      thumb: agentThumb_2,
      title: "Ananya Sharma",
      desc: "Senior Property Consultant",
   },
   {
      id: 3,
      page: "home_1",
      thumb: agentThumb_3,
      title: "Rohan Kapoor",
      desc: "Residential Property Advisor",
   },
   {
      id: 4,
      page: "home_1",
      thumb: agentThumb_4,
      title: "Meera Iyer",
      desc: "Luxury Homes Specialist",
   },
   {
      id: 5,
      page: "home_1",
      thumb: agentThumb_5,
      title: "Kabir Malhotra",
      desc: "Investment Property Advisor",
   },
]

export default agent_data;