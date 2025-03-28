import { useTheme } from "../../context/ThemeContext"; // Adjust the path as needed

import Nav from "./Nav";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
    const { theme } = useTheme(); // Get the current theme

    return (
        <div className={`${theme === "dark" ? "bg-mainGrey-veryDark text-white" : "bg-lines-light text-mainGrey-medium"} transition-all duration-300 min-h-screen flex`}>
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content Area */}
            <div className="flex-grow flex flex-col">
                {/* Navigation Bar */}
                <Nav />

                {/* Page Content */}
                <main className="flex-grow p-4">
                    {children} {/* This will be the page content */}
                </main>
            </div>
        </div>
    );
};

export default Layout;
