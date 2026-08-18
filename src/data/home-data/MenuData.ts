interface MenuItem {
    id: number;
    title: string;
    class_name?:string;
    link: string;
    has_dropdown: boolean;
    sub_menus?: {
        link: string;
        title: string;
    }[];
    menu_column?: {
        id: number;
        mega_title: string;
        mega_menus: {
            link: string;
            title: string;
        }[];
    }[]
}[];

const menu_data: MenuItem[] = [

    {
        id: 1,
        has_dropdown: true,
        title: "Home",
        link: "#",
        sub_menus: [
            
        ],
    },
    
    {
        id: 2,
        has_dropdown: true,
        title: "Listing",
        link: "#",
        sub_menus: [
            
            { link: "/listing_07", title: "Grid Top Filter" },
            { link: "/listing_05", title: "Grid Sidebar" },
            { link: "/listing_details_06", title: "Listing Details" },
            { link: "/listing_09", title: "Grid Banner Filter" },
            
        ],
    },


    {
        id: 3,
        has_dropdown: true,
        title: "Pages",
        link: "#",
        sub_menus: [
            { link: "/about_us_02", title: "About us" },
            { link: "/contact", title: "Contact Us" },
            { link: "/faq", title: "FAQ's" },
            
        ],
    },





    {
        id: 4,
        has_dropdown: true,
        title: "Blog",
        link: "#",
        sub_menus: [
            { link: "/blog_01", title: "Blog Grid" },
            { link: "/blog_02", title: "Blog List" },
            { link: "/blog_03", title: "Blog 2 column" },
            { link: "/blog_details", title: "Blog Details" },
        ],
    },
];
export default menu_data;
