import { StaticImageData } from "next/image";

import agentThumb_1 from "@/assets/images/agent/img_07.jpg";
import agentThumb_2 from "@/assets/images/agent/img_08.jpg";
import agentThumb_3 from "@/assets/images/agent/img_09.jpg";
import agentThumb_4 from "@/assets/images/agent/img_10.jpg";
import agentThumb_5 from "@/assets/images/agent/img_11.jpg";
import agentThumb_6 from "@/assets/images/agent/img_12.jpg";
import agentThumb_7 from "@/assets/images/agent/img_13.jpg";
import agentThumb_8 from "@/assets/images/agent/img_14.jpg";
import agentThumb_9 from "@/assets/images/agent/img_15.jpg";
import agentThumb_10 from "@/assets/images/agent/img_16.jpg";
import agentThumb_11 from "@/assets/images/agent/img_17.jpg";
import agentThumb_12 from "@/assets/images/agent/img_18.jpg";

interface DataType {
   id: number;
   thumb: StaticImageData;
   tag: string;
   title: string;
   data_delay_time?: string;
}

const inner_agent_data: DataType[] = [
   { id: 1, thumb: agentThumb_1, tag: "12 Listings", title: "Aarav Mehta" },
   { id: 2, thumb: agentThumb_2, tag: "9 Listings", title: "Ananya Sharma", data_delay_time: "0.1s" },
   { id: 3, thumb: agentThumb_3, tag: "15 Listings", title: "Rohan Kapoor", data_delay_time: "0.2s" },
   { id: 4, thumb: agentThumb_4, tag: "8 Listings", title: "Meera Iyer", data_delay_time: "0.3s" },
   { id: 5, thumb: agentThumb_5, tag: "14 Listings", title: "Kabir Malhotra" },
   { id: 6, thumb: agentThumb_6, tag: "10 Listings", title: "Ishita Rao", data_delay_time: "0.1s" },
   { id: 7, thumb: agentThumb_7, tag: "7 Listings", title: "Devika Nair", data_delay_time: "0.2s" },
   { id: 8, thumb: agentThumb_8, tag: "11 Listings", title: "Arjun Bhatia", data_delay_time: "0.3s" },
   { id: 9, thumb: agentThumb_9, tag: "6 Listings", title: "Aditya Singhal" },
   { id: 10, thumb: agentThumb_10, tag: "8 Listings", title: "Sneha Verma", data_delay_time: "0.1s" },
   { id: 11, thumb: agentThumb_11, tag: "5 Listings", title: "Priya Nambiar", data_delay_time: "0.2s" },
   { id: 12, thumb: agentThumb_12, tag: "9 Listings", title: "Vikram Deshmukh", data_delay_time: "0.3s" },
   { id: 13, thumb: agentThumb_1, tag: "12 Listings", title: "Aarav Mehta" },
   { id: 14, thumb: agentThumb_2, tag: "9 Listings", title: "Ananya Sharma", data_delay_time: "0.1s" },
   { id: 15, thumb: agentThumb_3, tag: "15 Listings", title: "Rohan Kapoor", data_delay_time: "0.2s" },
   { id: 16, thumb: agentThumb_4, tag: "8 Listings", title: "Meera Iyer", data_delay_time: "0.3s" },
   { id: 17, thumb: agentThumb_5, tag: "14 Listings", title: "Kabir Malhotra" },
   { id: 18, thumb: agentThumb_6, tag: "10 Listings", title: "Ishita Rao", data_delay_time: "0.1s" },
   { id: 19, thumb: agentThumb_7, tag: "7 Listings", title: "Devika Nair", data_delay_time: "0.2s" },
   { id: 20, thumb: agentThumb_8, tag: "11 Listings", title: "Arjun Bhatia", data_delay_time: "0.3s" },
   { id: 21, thumb: agentThumb_9, tag: "6 Listings", title: "Aditya Singhal" },
   { id: 22, thumb: agentThumb_10, tag: "8 Listings", title: "Sneha Verma", data_delay_time: "0.1s" },
   { id: 23, thumb: agentThumb_11, tag: "5 Listings", title: "Priya Nambiar", data_delay_time: "0.2s" },
   { id: 24, thumb: agentThumb_12, tag: "9 Listings", title: "Vikram Deshmukh", data_delay_time: "0.3s" },
   { id: 25, thumb: agentThumb_1, tag: "12 Listings", title: "Aarav Mehta" },
   { id: 26, thumb: agentThumb_2, tag: "9 Listings", title: "Ananya Sharma", data_delay_time: "0.1s" },
   { id: 27, thumb: agentThumb_3, tag: "15 Listings", title: "Rohan Kapoor", data_delay_time: "0.2s" },
   { id: 28, thumb: agentThumb_4, tag: "8 Listings", title: "Meera Iyer", data_delay_time: "0.3s" },
   { id: 29, thumb: agentThumb_5, tag: "14 Listings", title: "Kabir Malhotra" },
   { id: 30, thumb: agentThumb_6, tag: "10 Listings", title: "Ishita Rao", data_delay_time: "0.1s" },
   { id: 31, thumb: agentThumb_7, tag: "7 Listings", title: "Devika Nair", data_delay_time: "0.2s" },
   { id: 32, thumb: agentThumb_8, tag: "11 Listings", title: "Arjun Bhatia", data_delay_time: "0.3s" },
   { id: 33, thumb: agentThumb_9, tag: "6 Listings", title: "Aditya Singhal" },
   { id: 34, thumb: agentThumb_10, tag: "8 Listings", title: "Sneha Verma", data_delay_time: "0.1s" },
   { id: 35, thumb: agentThumb_11, tag: "5 Listings", title: "Priya Nambiar", data_delay_time: "0.2s" },
   { id: 36, thumb: agentThumb_12, tag: "9 Listings", title: "Vikram Deshmukh", data_delay_time: "0.3s" },
   { id: 37, thumb: agentThumb_1, tag: "12 Listings", title: "Aarav Mehta" },
   { id: 38, thumb: agentThumb_2, tag: "9 Listings", title: "Ananya Sharma", data_delay_time: "0.1s" },
   { id: 39, thumb: agentThumb_3, tag: "15 Listings", title: "Rohan Kapoor", data_delay_time: "0.2s" },
   { id: 40, thumb: agentThumb_4, tag: "8 Listings", title: "Meera Iyer", data_delay_time: "0.3s" },
   { id: 41, thumb: agentThumb_5, tag: "14 Listings", title: "Kabir Malhotra" },
   { id: 42, thumb: agentThumb_6, tag: "10 Listings", title: "Ishita Rao", data_delay_time: "0.1s" },
   { id: 43, thumb: agentThumb_7, tag: "7 Listings", title: "Devika Nair", data_delay_time: "0.2s" },
   { id: 44, thumb: agentThumb_8, tag: "11 Listings", title: "Arjun Bhatia", data_delay_time: "0.3s" },
   { id: 45, thumb: agentThumb_5, tag: "14 Listings", title: "Kabir Malhotra" },
   { id: 46, thumb: agentThumb_6, tag: "10 Listings", title: "Ishita Rao", data_delay_time: "0.1s" },
   { id: 47, thumb: agentThumb_7, tag: "7 Listings", title: "Devika Nair", data_delay_time: "0.2s" },
   { id: 48, thumb: agentThumb_8, tag: "11 Listings", title: "Arjun Bhatia", data_delay_time: "0.3s" },
]

export default inner_agent_data;