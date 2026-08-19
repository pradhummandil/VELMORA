interface DataType{
   id:number;
   page:string;
   class_name:string;
   date:string;
   info_name:string;
   info_time:number;
   title:string;
   data_delay_time?:string;
}

const blog_data:DataType[]=[
{
   id:1,
   page:"home_2",
   class_name:"blog-item-1",
   date:"09 FEB",
   info_name:"Aarav Mehta",
   info_time:6,
   title:"Buying a Luxury Home in India: What to Evaluate Before You Commit.",
},
{
   id:2,
   page:"home_2",
   class_name:"blog-item-2",
   date:"12 AUG",
   info_name:"Ananya Sharma",
   info_time:7,
   title:"Mumbai vs Bengaluru: Choosing the Right Premium Residential Market.",
   data_delay_time:"0.1s",
},

// home_4

{
   id:1,
   page:"home_4",
   class_name:"blog-item-1",
   date:"08 JAN",
   info_name:"Kabir Malhotra",
   info_time:8,
   title:"A Practical Guide to Buying Property on Golf Course Road, Gurugram.",
},
{
   id:2,
   page:"home_4",
   class_name:"blog-item-2",
   date:"17 AUG",
   info_name:"Meera Iyer",
   info_time:7,
   title:"Apartment or Villa? Finding the Right Property for Your Lifestyle.",
},
{
   id:3,
   page:"home_4",
   class_name:"blog-item-3",
   date:"21 SEP",
   info_name:"Rohan Kapoor",
   info_time:8,
   title:"Understanding Capital Appreciation in Indian Luxury Real Estate.",
},
]

export default blog_data;