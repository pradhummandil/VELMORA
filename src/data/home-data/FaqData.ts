interface DataType {
   id: number;
   page: string
   question: string;
   answer: string;
   showAnswer: boolean;
}

const faq_data:DataType[] = [
   {
      id: 1,
      page: "home_2_faq_1",
      question: "Advanced Property Search",
      answer: "Effortlessly discover curated homes across India using tailored filters for locality, configuration, and price bracket.",
      showAnswer: false,
   },
   {
      id: 2,
      page: "home_2_faq_1",
      question: "Dedicated Real Estate Advisors",
      answer: "Connect with certified regional luxury specialists in Mumbai, Delhi NCR, Bengaluru, Hyderabad, Pune, and Goa.",
      showAnswer: false,
   },
   {
      id: 3,
      page: "home_2_faq_1",
      question: "Verified Documentation & RERA",
      answer: "Every residence on VELMORA undergoes rigorous title due diligence and RERA compliance verification.",
      showAnswer: false,
   },

   // home_2_faq_2

   {
      id: 1,
      page: "home_2_faq_2",
      question: "How does the VELMORA property shortlisting process work?",
      answer: "Our advisory team conducts a personalized consultation to understand your spatial and investment criteria, then provides a curated shortlist of verified addresses.",
      showAnswer: false,
   },
   {
      id: 2,
      page: "home_2_faq_2",
      question: "How do you evaluate property investment potential?",
      answer: "We assess micro-market absorption rates, upcoming infrastructure corridors, rental yield benchmarks, and developer delivery track records.",
      showAnswer: false,
   },
   {
      id: 3,
      page: "home_2_faq_2",
      question: "What legal checks are conducted before listing?",
      answer: "We verify title clearance, encumbrance certificates, approved building floor plans, and RERA registration credentials.",
      showAnswer: false,
   },
   {
      id: 4,
      page: "home_2_faq_2",
      question: "Do you assist NRIs with property acquisition in India?",
      answer: "Yes, we provide end-to-end guidance for Non-Resident Indians including FEMA compliance, NRE/NRO account transactions, and remote documentation.",
      showAnswer: false,
   },

   // home_six
   
   {
      id: 1,
      page: "home_six",
      question: "Who We Are",
      answer: "VELMORA is an Indian premium real-estate advisory firm specializing in curated residential and investment properties across India's leading metros.",
      showAnswer: false,
   },
   {
      id: 2,
      page: "home_six",
      question: "Our Mission",
      answer: "To provide buyers, sellers, and investors with transparent, design-forward, and legally verified property advisory services.",
      showAnswer: false,
   },
   {
      id: 3,
      page: "home_six",
      question: "Our Vision",
      answer: "To elevate real estate standards across India through curated living spaces, architectural excellence, and timeless value.",
      showAnswer: false,
   },
];

export default faq_data;