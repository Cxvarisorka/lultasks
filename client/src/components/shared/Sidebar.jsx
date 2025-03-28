import { useContext, useState } from "react";
import { useTheme } from "../../context/ThemeContext"; // Adjust path as needed

// Svgs and icons
import logoDark from "../../assets/logo-dark.svg";
import logoLight from "../../assets/logo-light.svg";
import lightSwitch from "../../assets/icon-light-theme.svg";
import darkSwitch from "../../assets/icon-dark-theme.svg";

// Motion for animations
import { motion } from "framer-motion"; // Correct import for motion

// Contexts
import { InfoContext } from "../../context/InfoContext.jsx";

const AddBoardModal = ({ closeModal, addBoard }) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        addBoard(e.target.boardName.value);
        closeModal();
    }
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <motion.div
                        className="bg-white flex flex-col gap-10 dark:bg-mainGrey-dark p-10 rounded-lg shadow-lg w-1/4"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="flex justify-between w-full items-center">
                            <h2 className="text-3xl dark:text-white text-mainGrey-veryDark font-semibold">Add New Board</h2>

                            <button
                                className="text-mainGrey-medium dark:text-white dark:hover:text-white  hover:text-mainGrey-dark"
                                onClick={closeModal}
                            >
                                ✕
                            </button>
                        </div>
                        {/* Close Button */}
                        

                        {/* Form Field */}
                        <form className="flex flex-col gap-10" onSubmit={handleSubmit}>
                            <div className="flex flex-col gap-3">
                                <label className="text-mainGrey-medium text-lg font-bold">Baord Name</label>
                                <input
                                    type="text"
                                    name="boardName"
                                    placeholder="e.g WebDesign"
                                    className="w-full p-3 text-lg border rounded-lg dark:bg-mainGrey-veryDark dark:text-white"
                                    required
                                />  
                            </div>

                            {/* Action Buttons */}
                            <button className="px-4 py-3 bg-mainPurple-main w-full text-white text-lg font-semibold rounded-3xl hover:bg-mainPurple-hover hover:bg-opacity-15 hover:text-mainPurple-main transition-all">
                                Create New Board
                            </button>
                        </form>
                    </motion.div>
                </div>
    )
}

const Sidebar = () => {
    const { boards, setActiveBoardId, activeBoardId, addBoard } = useContext(InfoContext);
    const { theme, toggleTheme } = useTheme();

    const [isSidebarVisible, setIsSidebarVisible] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarVisible(!isSidebarVisible);
    };

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <>
            <div className={`relative flex flex-col justify-between h-screen transition-all duration-300 ${isSidebarVisible ? 'w-96 pr-5' : 'w-0'} bg-white dark:bg-mainGrey-dark border-r-2 dark:border-lines-light/50`}>
                {/* Sidebar Content */}
                {isSidebarVisible && (
                    <>
                        <div className="flex flex-col gap-12 pt-12">
                            {/* Logo */}
                            <img className="px-5 w-full" src={theme === "dark" ? logoLight : logoDark} alt="Logo" />

                            {/* Board List */}
                            <div className="flex flex-col gap-5">
                                <motion.p
                                    className="font-semibold text-mainGrey-medium px-5"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: isSidebarVisible ? 1 : 0 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    All Boards ({boards.length})
                                </motion.p>
                                <ul className="flex flex-col">
                                    {boards.map((board) => (
                                        <motion.li
                                            key={board.id}
                                            className={`flex items-center gap-3 font-medium text-lg py-3 px-5 w-full cursor-pointer transition-all duration-200 rounded-r-full ${
                                                activeBoardId === board.id
                                                    ? "text-white bg-mainPurple-main"
                                                    : "text-mainGrey-medium dark:hover:bg-white hover:bg-mainPurple-hover hover:bg-opacity-15 hover:text-mainPurple-main"
                                            }`}
                                            onClick={() => setActiveBoardId(board.id)}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: isSidebarVisible ? 1 : 0 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <span className="material-symbols-outlined">space_dashboard</span>
                                            {board.name}
                                        </motion.li>
                                    ))}

                                    {/* Add Board Button */}
                                    <motion.li
                                        className="flex gap-3 transition-all duration-200 rounded-r-full py-3 px-5 cursor-pointer text-mainPurple-main w-full text-lg font-medium"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: isSidebarVisible ? 1 : 0 }}
                                        transition={{ duration: 0.3 }}
                                        onClick={openModal}
                                    >
                                        <span className="material-symbols-outlined">space_dashboard</span>
                                        + Add Dashboard
                                    </motion.li>
                                </ul>
                            </div>
                        </div>

                        <div className="flex flex-col gap-7 pb-12">
                            {/* Theme Toggle */}
                            <div className="flex justify-center ml-5 gap-4 items-center px-5 py-3 rounded-lg bg-mainGrey-light dark:bg-mainGrey-veryDark relative">
                                <span><img src={lightSwitch} alt="Light Mode" className="w-6 h-6" /></span>
                                <button
                                    onClick={toggleTheme}
                                    className="flex items-center w-14 h-8 bg-mainPurple-main rounded-full p-1 cursor-pointer transition-colors"
                                >
                                    <motion.div
                                        className="w-6 h-6 bg-white rounded-full shadow-md"
                                        initial={{ x: theme === "dark" ? 24 : 0 }}
                                        animate={{ x: theme === "dark" ? 24 : 0 }}
                                        transition={{ type: "spring", stiffness: 200, damping: 20 }}
                                    />
                                </button>
                                <span><img src={darkSwitch} alt="Dark Mode" className="w-6 h-6" /></span>
                            </div>

                            {/* Hide Sidebar Button */}
                            <div
                                className="flex gap-3 transition-all duration-200 rounded-r-full py-3 px-5 cursor-pointer text-mainGrey-medium dark:hover:bg-white hover:bg-mainPurple-hover hover:bg-opacity-15 hover:text-mainPurple-main w-full text-lg font-medium"
                                onClick={toggleSidebar}
                            >
                                <span className="material-symbols-outlined">visibility_off</span>
                                <p>Hide Sidebar</p>
                            </div>
                        </div>
                    </>
                )}

                {/* Show Sidebar Button when Hidden */}
                {!isSidebarVisible && (
                    <motion.div
                        className="absolute bottom-10 left-0 px-8 py-3 flex justify-center items-center bg-mainPurple-main text-white rounded-r-full text-3xl shadow-md cursor-pointer"
                        onClick={toggleSidebar}
                        initial={{ x: -50 }}
                        animate={{ x: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    >
                        <span className="material-symbols-outlined">visibility</span>
                    </motion.div>
                )}
            </div>

            {/* Overlay Modal */}
            {isModalOpen && (
                <AddBoardModal closeModal={closeModal} addBoard={addBoard}/>
            )}
        </>
    );
};

export default Sidebar;
