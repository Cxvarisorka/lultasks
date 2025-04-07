import { useState } from "react";
import { motion } from "framer-motion";

const AddColumnModal = ({ closeModal, handleSubmit }) => {
    const colorOptions = [
        "#FF6F61", // Coral
        "#4E9F3D", // Green
        "#F9A602", // Yellow
        "#6096BA", // Blue
        "#F2D7A1", // Light Beige
        "#A3A3A3", // Gray
        "#6B4F97"  // Purple
    ];
    const [selectedColor, setSelectedColor] = useState(colorOptions[0]);

    const onSubmit = (e) => {
        e.preventDefault();
        handleSubmit(e, selectedColor);
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
                    <h2 className="text-3xl dark:text-white text-mainGrey-veryDark font-semibold">Add New Column</h2>
                    <button
                        className="text-mainGrey-medium dark:text-white dark:hover:text-white hover:text-mainGrey-dark"
                        onClick={closeModal}
                    >
                        ✕
                    </button>
                </div>

                {/* Form Field */}
                <form className="flex flex-col gap-10" onSubmit={onSubmit}>
                    <div className="flex flex-col gap-3">
                        <label className="text-mainGrey-medium text-lg font-bold">Column Name</label>
                        <input
                            type="text"
                            name="columnName"
                            placeholder="e.g WebDesign"
                            className="w-full p-3 text-lg border rounded-lg dark:bg-mainGrey-veryDark dark:text-white"
                            required
                        />
                    </div>

                    <div className="flex flex-col gap-3">
                        <label className="text-mainGrey-medium text-lg font-bold">Column Color</label>
                        <div className="flex gap-3">
                            {colorOptions.map((color, index) => (
                                <button
                                    key={index}
                                    type="button"
                                    className={`w-12 h-12 rounded-full ${selectedColor === color ? 'border-4 border-mainPurple-main' : ''}`}
                                    onClick={() => setSelectedColor(color)}
                                    style={{ backgroundColor: color }}
                                ></button>
                            ))}
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <button className="px-4 py-3 bg-mainPurple-main w-full text-white text-lg font-semibold rounded-3xl hover:bg-mainPurple-hover hover:bg-opacity-15 hover:text-mainPurple-main transition-all">
                        Create New Column
                    </button>
                </form>
            </motion.div>
        </div>
    );
};

export default AddColumnModal;