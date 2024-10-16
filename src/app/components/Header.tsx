"use client";

import { useDrawer } from "../context/DrawerContext";
import ThemeSwitch from "./ThemeSwitch";

const Header: React.FC = () => {
    const { toggleDrawer } = useDrawer();
    return (
        <header className="header">
            <div className="mx-8 my-2 flex justify-between">

                <svg
                    onClick={toggleDrawer}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="#ffffff"
                    className="size-6"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                    />
                </svg>
                <ThemeSwitch />
            </div>
        </header>
    );
};

export default Header;
