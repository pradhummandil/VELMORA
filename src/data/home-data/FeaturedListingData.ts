interface DataType {
   id: number;
   page: string;
   tag: string;
   title: string;
   address: string;
   data_delay_time?: string;
   item_bg_img:string;
   property_info: {
      feature: string;
      total_feature: number;
   }[];
}[];

const feature_listing_data:DataType[]=[
   {
      id: 1,
      page: "home_5",
      tag: "Rent",
      item_bg_img:"item-bg-1",
      title: "The Meridian Residences",
      address: "Dr. Annie Besant Road, Worli, Mumbai",
      property_info: [{feature: "sqft", total_feature: 2450 }, {feature: "bed", total_feature: 3 }, {feature: "kitchen", total_feature: 1 }, {feature: "bath", total_feature: 3 },],
   },
   {
      id: 2,
      page: "home_5",
      tag: "Sell",
      item_bg_img:"item-bg-2",
      title: "Casa Sol Luxury Villa",
      address: "Badem Road, Assagao, North Goa",
      data_delay_time:"0.1s",
      property_info: [{feature: "sqft", total_feature: 4200 }, {feature: "bed", total_feature: 4 }, {feature: "kitchen", total_feature: 1 }, {feature: "bath", total_feature: 4 },],
   },
   {
      id: 3,
      page: "home_5",
      tag: "Rent",
      item_bg_img:"item-bg-3",
      title: "Serein Sky Residence",
      address: "100 Feet Road, Indiranagar, Bengaluru",
      data_delay_time:"0.2s",
      property_info: [{feature: "sqft", total_feature: 2850 }, {feature: "bed", total_feature: 3 }, {feature: "kitchen", total_feature: 1 }, {feature: "bath", total_feature: 3 },],
   },
]

export default feature_listing_data;