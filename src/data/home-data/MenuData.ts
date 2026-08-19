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
        has_dropdown: false,
        title: "Buy",
        link: "/listing_01",
    },
    {
        id: 2,
        has_dropdown: false,
        title: "Rent",
        link: "/listing_03",
    },
    {
        id: 3,
        has_dropdown: false,
        title: "Projects",
        link: "/project_01",
    },
    {
        id: 4,
        has_dropdown: false,
        title: "Agents",
        link: "/agent",
    },
    {
        id: 5,
        has_dropdown: false,
        title: "Agencies",
        link: "/agency",
    },
    {
        id: 6,
        has_dropdown: false,
        title: "Insights",
        link: "/blog_01",
    },
    {
        id: 7,
        has_dropdown: false,
        title: "About",
        link: "/about_us_01",
    },
];
export default menu_data;
