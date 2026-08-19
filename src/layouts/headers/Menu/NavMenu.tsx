"use client";
import menu_data from "@/data/home-data/MenuData";
import Link from "next/link.js";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useState } from "react";

import logo from "@/assets/images/logo/logo_01.svg";
import { useAuth } from "@/context/AuthContext";

const NavMenu = () => {
    const pathname = usePathname();
    const { isAuthenticated } = useAuth();
    const [navTitle, setNavTitle] = useState("");

    const openMobileMenu = (menu: any) => {
        if (navTitle === menu) {
            setNavTitle("");
        } else {
            setNavTitle(menu);
        }
    };

    return (
        <ul className="navbar-nav align-items-lg-center">
            <li className="d-block d-lg-none">
                <div className="logo">
                    <Link href="/" className="d-block">
                        <Image src={logo} alt="" />
                    </Link>
                </div>
            </li>
            <li className="nav-item dashboard-menu">
                {isAuthenticated ? (
                    <Link className="nav-link" href="/dashboard/dashboard-index">
                        Dashboard
                    </Link>
                ) : (
                    <Link className="nav-link" href="#" data-bs-toggle="modal" data-bs-target="#loginModal">
                        Dashboard
                    </Link>
                )}
            </li>

            {menu_data.map((menu: any) => (
                <li
                    key={menu.id}
                    className={`nav-item dropdown ${menu.class_name ? menu.class_name : ""} ${!menu.has_dropdown ? "no-dropdown" : ""}`}
                >
                    <Link
                        href={menu.link}
                        className={`nav-link ${menu.has_dropdown ? "dropdown-toggle" : ""} 
                        ${pathname === menu.link ? "active" : ""} ${navTitle === menu.title ? "show" : ""}`}
                        onClick={() => menu.has_dropdown && openMobileMenu(menu.title)}
                    >
                        {menu.title}
                    </Link>
                    {menu.has_dropdown && (
                        <ul className={`dropdown-menu ${navTitle === menu.title ? "show" : ""}`}>
                            {menu.sub_menus &&
                                menu.sub_menus.map((sub_m: any, i: any) => (
                                    <li key={i}>
                                        <Link
                                            href={sub_m.link}
                                            className={`dropdown-item ${pathname === sub_m.link ? "active" : ""}`}
                                        >
                                            <span>{sub_m.title}</span>
                                        </Link>
                                    </li>
                                ))}
                            {menu.menu_column && (
                                <li className="row gx-1">
                                    {menu.menu_column.map((item: any) => (
                                        <div key={item.id} className="col-lg-4">
                                            <div className="menu-column">
                                                <h6 className="mega-menu-title">{item.mega_title}</h6>
                                                <ul className="style-none mega-dropdown-list">
                                                    {item.mega_menus.map((mega_m: any, i: any) => (
                                                        <li key={i}>
                                                            <Link
                                                                href={mega_m.link}
                                                                className={`dropdown-item ${pathname === mega_m.link ? "active" : ""}`}
                                                            >
                                                                <span>{mega_m.title}</span>
                                                            </Link>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    ))}
                                </li>
                            )}
                        </ul>
                    )}
                </li>
            ))}
        </ul>
    );
};

export default NavMenu;
