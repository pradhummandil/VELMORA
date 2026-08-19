interface DataType {
   id: number;
   page: string;
   widget_title: string;
   widget_class?: string;
   widget_class2?: string;
   footer_link: {
      link: string;
      link_title: string;
   }[];

}

const footer_data: DataType[] = [
   {
      id: 1,
      page: "home_1",
      widget_class: "xs-mt-50",
      widget_title: "Navigation",
      footer_link: [
         { link: "/listing_01", link_title: "Properties" },
         { link: "/project_01", link_title: "Projects" },
         { link: "/agent", link_title: "Agents" },
         { link: "/agency", link_title: "Agencies" },
         { link: "/about_us_01", link_title: "About" },
         { link: "/blog_01", link_title: "Insights" },
         { link: "/contact", link_title: "Contact" },
      ]
   },
   {
      id: 2,
      widget_class: "xs-mt-30",
      page: "home_1",
      widget_title: "Legal",
      footer_link: [
         { link: "/faq", link_title: "Privacy Policy" },
         { link: "/faq", link_title: "Terms" },
         { link: "/faq", link_title: "Cookie Policy" },
         { link: "/faq", link_title: "FAQ" },
      ]
   },
   {
      id: 3,
      widget_class: "xs-mt-30",
      page: "home_1",
      widget_title: "Properties",
      footer_link: [
         { link: "/listing_01", link_title: "Buy Apartments" },
         { link: "/listing_02", link_title: "Luxury Condos" },
         { link: "/listing_03", link_title: "Rent Residences" },
         { link: "/listing_05", link_title: "Premium Villas" },
         { link: "/listing_06", link_title: "Commercial Spaces" },
      ]
   },

   // home two / three

   {
      id: 1,
      page: "home_3",
      widget_title: "Navigation",
      footer_link: [
         { link: "/listing_01", link_title: "Properties" },
         { link: "/project_01", link_title: "Projects" },
         { link: "/agent", link_title: "Agents" },
         { link: "/agency", link_title: "Agencies" },
         { link: "/about_us_01", link_title: "About" },
         { link: "/blog_01", link_title: "Insights" },
      ]
   },
   {
      id: 2,
      widget_class: "col-xxl-3 col-xl-4",
      page: "home_3",
      widget_title: "Legal",
      footer_link: [
         { link: "/faq", link_title: "Privacy Policy" },
         { link: "/faq", link_title: "Terms" },
         { link: "/faq", link_title: "Cookie Policy" },
         { link: "/faq", link_title: "FAQ" },
      ]
   },
   {
      id: 3,
      page: "home_3",
      widget_title: "Properties",
      footer_link: [
         { link: "/listing_01", link_title: "Buy Apartments" },
         { link: "/listing_02", link_title: "Luxury Condos" },
         { link: "/listing_03", link_title: "Rent Residences" },
         { link: "/listing_05", link_title: "Premium Villas" },
      ]
   },

   // home four

   {
      id: 1,
      page: "home_4",
      widget_class: "col-lg-2",
      widget_title: "Navigation",
      footer_link: [
         { link: "/", link_title: "Home" },
         { link: "/about_us_01", link_title: "About" },
         { link: "/blog_01", link_title: "Insights" },
         { link: "/contact", link_title: "Contact" },
      ]
   },
   {
      id: 2,
      widget_class: "col-xl-2 col-lg-3",
      page: "home_4",
      widget_title: "Properties",
      footer_link: [
         { link: "/listing_01", link_title: "Buy Apartments" },
         { link: "/listing_02", link_title: "Luxury Condos" },
         { link: "/listing_03", link_title: "Rent Residences" },
         { link: "/listing_05", link_title: "Premium Villas" },
      ]
   },
   {
      id: 3,
      widget_class: "col-xl-2 col-lg-3",
      page: "home_4",
      widget_title: "Legal",
      footer_link: [
         { link: "/faq", link_title: "Privacy Policy" },
         { link: "/faq", link_title: "Terms" },
         { link: "/faq", link_title: "Cookie Policy" },
         { link: "/faq", link_title: "FAQ" },
      ]
   },

   // home five

   {
      id: 1,
      page: "home_5",
      widget_class: "col-lg-3 ms-auto",
      widget_class2: "ps-xl-5",
      widget_title: "Navigation",
      footer_link: [
         { link: "/", link_title: "Home" },
         { link: "/about_us_01", link_title: "About" },
         { link: "/blog_01", link_title: "Insights" },
         { link: "/contact", link_title: "Contact" },
         { link: "/dashboard/dashboard-index", link_title: "Dashboard" },
      ]
   },
   {
      id: 2,
      widget_class: "col-lg-3",
      page: "home_5",
      widget_title: "Legal",
      footer_link: [
         { link: "/faq", link_title: "Privacy Policy" },
         { link: "/faq", link_title: "Terms" },
         { link: "/faq", link_title: "Cookie Policy" },
         { link: "/faq", link_title: "FAQ" },
      ]
   },
   {
      id: 3,
      widget_class: "col-lg-2",
      page: "home_5",
      widget_title: "Properties",
      footer_link: [
         { link: "/listing_01", link_title: "Buy Apartments" },
         { link: "/listing_02", link_title: "Luxury Condos" },
         { link: "/listing_03", link_title: "Rent Residences" },
         { link: "/listing_05", link_title: "Premium Villas" },
      ]
   },
]

export default footer_data;