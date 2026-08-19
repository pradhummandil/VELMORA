interface InputField {
   id: number;
   page: string;
   col?: string;
   border_lg?: string;
   label: string;
   options: {
      value: string;
      text: string;
   }[];
   className?: string;
}[]

const dropdoun_data: InputField[] = [
   {
      id: 1,
      page: "home_1",
      col: "col-xl-3",
      label: "I’m looking to...",
      options: [{ value: "1", text: "Buy Apartments" }, { value: "2", text: "Rent Luxury Flats" }, { value: "3", text: "Buy Villas" }, { value: "4", text: "Sell Properties" }, { value: "5", text: "Commercial Spaces" }, { value: "6", text: "Penthouses" },],
   },
   {
      id: 2,
      page: "home_1",
      col: "col-xl-4",
      label: "Location",
      options: [{ value: "1", text: "Worli, Mumbai" }, { value: "2", text: "Golf Course Rd, Gurugram" }, { value: "3", text: "Indiranagar, Bengaluru" }, { value: "4", text: "Jubilee Hills, Hyderabad" }, { value: "5", text: "Koregaon Park, Pune" }, { value: "6", text: "Assagao, Goa" }, { value: "7", text: "Vasant Vihar, Delhi NCR" },],
      className: "location",
   },
   {
      id: 3,
      page: "home_1",
      col: "col-xl-3",
      border_lg: "border-lg-0",
      label: "Price Range",
      options: [{ value: "1", text: "₹50 Lakh - ₹1.5 Cr" }, { value: "2", text: "₹1.5 Cr - ₹3.5 Cr" }, { value: "3", text: "₹3.5 Cr - ₹10 Cr+" },],
   },

   // home_2_tab_1

   {
      id: 1,
      page: "home_2_tab_1",
      col: "col-xl-2",
      label: "I’m looking to...",
      options: [{ value: "1", text: "Buy Apartments" }, { value: "2", text: "Rent Luxury Flats" }, { value: "3", text: "Buy Villas" }, { value: "4", text: "Sell Properties" }, { value: "5", text: "Commercial Spaces" }, { value: "6", text: "Penthouses" },],
   },
   {
      id: 2,
      page: "home_2_tab_1",
      col: "col-xl-3",
      label: "Location",
      options: [{ value: "1", text: "Mumbai, Maharashtra" }, { value: "2", text: "Gurugram, Haryana" }, { value: "3", text: "Bengaluru, Karnataka" }, { value: "4", text: "Hyderabad, Telangana" }, { value: "5", text: "Delhi NCR, India" }, { value: "6", text: "Pune, Maharashtra" }, { value: "7", text: "Goa, India" },],
      className: "location",
   },
   {
      id: 3,
      page: "home_2_tab_1",
      col: "col-xl-3",
      label: "Price Range",
      options: [{ value: "1", text: "₹50 Lakh - ₹1.5 Cr" }, { value: "2", text: "₹1.5 Cr - ₹3.5 Cr" }, { value: "3", text: "₹3.5 Cr - ₹10 Cr+" },],
   },

   // home_2_tab_2

   {
      id: 1,
      page: "home_2_tab_2",
      col: "col-xl-2",
      label: "I’m looking to...",
      options: [{ value: "1", text: "Rent Luxury Flats" }, { value: "2", text: "Rent Villas" }, { value: "3", text: "Buy Apartments" }, { value: "4", text: "Commercial Leases" }, { value: "5", text: "Penthouses" }, { value: "6", text: "Plots" },],
   },
   {
      id: 2,
      page: "home_2_tab_2",
      col: "col-xl-3",
      label: "Location",
      options: [{ value: "1", text: "Worli, Mumbai" }, { value: "2", text: "Golf Course Rd, Gurugram" }, { value: "3", text: "Indiranagar, Bengaluru" }, { value: "4", text: "Jubilee Hills, Hyderabad" }, { value: "5", text: "Koregaon Park, Pune" }, { value: "6", text: "Assagao, Goa" }, { value: "7", text: "Vasant Vihar, Delhi NCR" },],
      className: "location",
   },
   {
      id: 3,
      page: "home_2_tab_2",
      col: "col-xl-3",
      label: "Price Range",
      options: [{ value: "1", text: "₹50,000 - ₹1.5 Lakh/mo" }, { value: "2", text: "₹1.5 Lakh - ₹3 Lakh/mo" }, { value: "3", text: "₹3 Lakh+/mo" },],
   },

   // home_3_tab_1

   {
      id: 1,
      page: "home_3_tab_1",
      col: "mb-25",
      label: "I’m looking to...",
      options: [{ value: "1", text: "Buy Apartments" }, { value: "2", text: "Rent Luxury Flats" }, { value: "3", text: "Buy Villas" }, { value: "4", text: "Sell Properties" }, { value: "5", text: "Commercial Spaces" }, { value: "6", text: "Penthouses" },],
   },
   {
      id: 2,
      page: "home_3_tab_1",
      col: "mb-25",
      label: "Location",
      options: [{ value: "1", text: "Worli, Mumbai" }, { value: "2", text: "Golf Course Rd, Gurugram" }, { value: "3", text: "Indiranagar, Bengaluru" }, { value: "4", text: "Jubilee Hills, Hyderabad" }, { value: "5", text: "Koregaon Park, Pune" }, { value: "6", text: "Assagao, Goa" }, { value: "7", text: "Vasant Vihar, Delhi NCR" },],
      className: "location",
   },
   {
      id: 3,
      page: "home_3_tab_1",
      col: "mb-50 lg-mb-30",
      border_lg: "border-lg-0",
      label: "Price Range",
      options: [{ value: "1", text: "₹50 Lakh - ₹1.5 Cr" }, { value: "2", text: "₹1.5 Cr - ₹3.5 Cr" }, { value: "3", text: "₹3.5 Cr - ₹10 Cr+" },],
   },

   // home_3_tab_2

   {
      id: 1,
      page: "home_3_tab_2",
      col: "mb-25",
      label: "I’m looking to...",
      options: [{ value: "1", text: "Rent Luxury Flats" }, { value: "2", text: "Buy Apartments" }, { value: "3", text: "Buy Villas" }, { value: "4", text: "Commercial Leases" }, { value: "5", text: "Penthouses" }, { value: "6", text: "Plots" },],
   },
   {
      id: 2,
      page: "home_3_tab_2",
      col: "mb-25",
      label: "Location",
      options: [{ value: "1", text: "Worli, Mumbai" }, { value: "2", text: "Golf Course Rd, Gurugram" }, { value: "3", text: "Indiranagar, Bengaluru" }, { value: "4", text: "Jubilee Hills, Hyderabad" }, { value: "5", text: "Koregaon Park, Pune" }, { value: "6", text: "Assagao, Goa" }, { value: "7", text: "Vasant Vihar, Delhi NCR" },],
      className: "location",
   },
   {
      id: 3,
      page: "home_3_tab_2",
      col: "mb-50 lg-mb-30",
      border_lg: "border-lg-0",
      label: "Price Range",
      options: [{ value: "1", text: "₹50,000 - ₹1.5 Lakh/mo" }, { value: "2", text: "₹1.5 Lakh - ₹3 Lakh/mo" }, { value: "3", text: "₹3 Lakh+/mo" },],
   },

   // home_3_tab_3

   {
      id: 1,
      page: "home_3_tab_3",
      col: "mb-25",
      label: "I’m looking to...",
      options: [{ value: "1", text: "Sell Properties" }, { value: "2", text: "List Luxury Flats" }, { value: "3", text: "Sell Villas" }, { value: "4", text: "Commercial Sales" }, { value: "5", text: "Plots" }, { value: "6", text: "Penthouses" },],
   },
   {
      id: 2,
      page: "home_3_tab_3",
      col: "mb-25",
      label: "Location",
      options: [{ value: "1", text: "Mumbai, Maharashtra" }, { value: "2", text: "Gurugram, Haryana" }, { value: "3", text: "Bengaluru, Karnataka" }, { value: "4", text: "Hyderabad, Telangana" }, { value: "5", text: "Delhi NCR, India" }, { value: "6", text: "Pune, Maharashtra" }, { value: "7", text: "Goa, India" },],
      className: "location",
   },
   {
      id: 3,
      page: "home_3_tab_3",
      col: "mb-50 lg-mb-30",
      border_lg: "border-lg-0",
      label: "Price Range",
      options: [{ value: "1", text: "₹50 Lakh - ₹1.5 Cr" }, { value: "2", text: "₹1.5 Cr - ₹3.5 Cr" }, { value: "3", text: "₹3.5 Cr - ₹10 Cr+" },],
   },

   // home_5_tab_1

   {
      id: 1,
      page: "home_5_tab_1",
      col: "col-lg-3",
      label: "I’m looking to...",
      border_lg: "border-left",
      options: [{ value: "1", text: "Buy Apartments" }, { value: "2", text: "Rent Luxury Flats" }, { value: "3", text: "Buy Villas" }, { value: "4", text: "Sell Properties" }, { value: "5", text: "Commercial Spaces" }, { value: "6", text: "Penthouses" },],
   },
   {
      id: 2,
      page: "home_5_tab_1",
      col: "col-lg-4",
      label: "Location",
      border_lg: "border-left",
      options: [{ value: "1", text: "Worli, Mumbai" }, { value: "2", text: "Golf Course Rd, Gurugram" }, { value: "3", text: "Indiranagar, Bengaluru" }, { value: "4", text: "Jubilee Hills, Hyderabad" }, { value: "5", text: "Koregaon Park, Pune" }, { value: "6", text: "Assagao, Goa" }, { value: "7", text: "Vasant Vihar, Delhi NCR" },],
      className: "location",
   },
   {
      id: 3,
      page: "home_5_tab_1",
      col: "col-xl-3 col-lg-4",
      label: "Price Range",
      options: [{ value: "1", text: "₹50 Lakh - ₹1.5 Cr" }, { value: "2", text: "₹1.5 Cr - ₹3.5 Cr" }, { value: "3", text: "₹3.5 Cr - ₹10 Cr+" },],
   },

   // home_5_tab_2

   {
      id: 1,
      page: "home_5_tab_2",
      col: "col-lg-3",
      label: "I’m looking to...",
      border_lg: "border-left",
      options: [{ value: "1", text: "Rent Luxury Flats" }, { value: "2", text: "Buy Apartments" }, { value: "3", text: "Buy Villas" }, { value: "4", text: "Commercial Leases" }, { value: "5", text: "Penthouses" }, { value: "6", text: "Plots" },],
   },
   {
      id: 2,
      page: "home_5_tab_2",
      col: "col-lg-4",
      label: "Location",
      border_lg: "border-left",
      options: [{ value: "1", text: "Worli, Mumbai" }, { value: "2", text: "Golf Course Rd, Gurugram" }, { value: "3", text: "Indiranagar, Bengaluru" }, { value: "4", text: "Jubilee Hills, Hyderabad" }, { value: "5", text: "Koregaon Park, Pune" }, { value: "6", text: "Assagao, Goa" }, { value: "7", text: "Vasant Vihar, Delhi NCR" },],
      className: "location",
   },
   {
      id: 3,
      page: "home_5_tab_2",
      col: "col-xl-3 col-lg-4",
      label: "Price Range",
      options: [{ value: "1", text: "₹50,000 - ₹1.5 Lakh/mo" }, { value: "2", text: "₹1.5 Lakh - ₹3 Lakh/mo" }, { value: "3", text: "₹3 Lakh+/mo" },],
   },

   // home_6_tab_1

   {
      id: 1,
      page: "home_6_tab_1",
      col: "col-xxl-2",
      label: "I’m looking to...",
      options: [{ value: "1", text: "Buy Apartments" }, { value: "2", text: "Rent Luxury Flats" }, { value: "3", text: "Buy Villas" }, { value: "4", text: "Sell Properties" }, { value: "5", text: "Commercial Spaces" }, { value: "6", text: "Penthouses" },],
   },
   {
      id: 2,
      page: "home_6_tab_1",
      label: "Location",
      options: [{ value: "1", text: "Worli, Mumbai" }, { value: "2", text: "Golf Course Rd, Gurugram" }, { value: "3", text: "Indiranagar, Bengaluru" }, { value: "4", text: "Jubilee Hills, Hyderabad" }, { value: "5", text: "Koregaon Park, Pune" }, { value: "6", text: "Assagao, Goa" }, { value: "7", text: "Vasant Vihar, Delhi NCR" },],
      className: "location",
   },
   {
      id: 3,
      page: "home_6_tab_1",
      border_lg: "border-lg-0",
      label: "Price Range",
      options: [{ value: "1", text: "₹50 Lakh - ₹1.5 Cr" }, { value: "2", text: "₹1.5 Cr - ₹3.5 Cr" }, { value: "3", text: "₹3.5 Cr - ₹10 Cr+" },],
   },

   // home_6_tab_2

   {
      id: 1,
      page: "home_6_tab_2",
      col: "col-xxl-2",
      label: "I’m looking to...",
      options: [{ value: "1", text: "Rent Luxury Flats" }, { value: "2", text: "Buy Apartments" }, { value: "3", text: "Buy Villas" }, { value: "4", text: "Commercial Leases" }, { value: "5", text: "Penthouses" }, { value: "6", text: "Plots" },],
   },
   {
      id: 2,
      page: "home_6_tab_2",
      label: "Location",
      options: [{ value: "1", text: "Worli, Mumbai" }, { value: "2", text: "Golf Course Rd, Gurugram" }, { value: "3", text: "Indiranagar, Bengaluru" }, { value: "4", text: "Jubilee Hills, Hyderabad" }, { value: "5", text: "Koregaon Park, Pune" }, { value: "6", text: "Assagao, Goa" }, { value: "7", text: "Vasant Vihar, Delhi NCR" },],
      className: "location",
   },
   {
      id: 3,
      page: "home_6_tab_2",
      border_lg: "border-lg-0",
      label: "Price Range",
      options: [{ value: "1", text: "₹50,000 - ₹1.5 Lakh/mo" }, { value: "2", text: "₹1.5 Lakh - ₹3 Lakh/mo" }, { value: "3", text: "₹3 Lakh+/mo" },],
   },

   // home_6_tab_3

   {
      id: 1,
      page: "home_6_tab_3",
      col: "col-xxl-2",
      label: "I’m looking to...",
      options: [{ value: "1", text: "Sell Properties" }, { value: "2", text: "List Luxury Flats" }, { value: "3", text: "Sell Villas" }, { value: "4", text: "Commercial Sales" }, { value: "5", text: "Plots" }, { value: "6", text: "Penthouses" },],
   },
   {
      id: 2,
      page: "home_6_tab_3",
      label: "Location",
      options: [{ value: "1", text: "Mumbai, Maharashtra" }, { value: "2", text: "Gurugram, Haryana" }, { value: "3", text: "Bengaluru, Karnataka" }, { value: "4", text: "Hyderabad, Telangana" }, { value: "5", text: "Delhi NCR, India" }, { value: "6", text: "Pune, Maharashtra" }, { value: "7", text: "Goa, India" },],
      className: "location",
   },
   {
      id: 3,
      page: "home_6_tab_3",
      border_lg: "border-lg-0",
      label: "Price Range",
      options: [{ value: "1", text: "₹50 Lakh - ₹1.5 Cr" }, { value: "2", text: "₹1.5 Cr - ₹3.5 Cr" }, { value: "3", text: "₹3.5 Cr - ₹10 Cr+" },],
   },
];

export default dropdoun_data;