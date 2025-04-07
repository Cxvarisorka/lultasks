import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";


const AddTaskModal = ({ closeModal, addTask, columnId }) => {
    const [subtasks, setSubtasks] = useState([""]);
    const [status, setStatus] = useState("Todo");
    const [error, setError] = useState("");

    // Add new subtask input field
    const addSubtaskForm = () => {
        setError("");
        if(subtasks.length === 3) {
            return;
        }
        setSubtasks([...subtasks, ""]);
    };

    // Remove subtask
    const removeSubtaskForm = (index) => {
        if(subtasks.length === 1){
            setError("Minimum one subtask is required");
            return;
        }
        setSubtasks(subtasks.filter((_, i) => i !== index));
        setError("");
    };

    // Handle subtask change
    const handleSubtaskChange = (index, value) => {
        const newSubtasks = [...subtasks];
        newSubtasks[index] = value;
        setSubtasks(newSubtasks);
    };

    // Handle Submit
    const handleSubmit = (e) => {
        // columnId, title, description, status, initialSubtasks
        e.preventDefault();
        addTask(columnId, e.target.title.value, e.target.description.value, e.target.status.value, subtasks);
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
                {/* Modal Header */}
                <div className="flex justify-between items-center">
                    <h2 className="text-3xl dark:text-white text-mainGrey-veryDark font-semibold">Add New Task</h2>
                    <button
                        className="text-mainGrey-medium dark:text-white dark:hover:text-white hover:text-mainGrey-dark"
                        onClick={closeModal}
                    >
                        ✕
                    </button>
                </div>

                {/* Form */}
                <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                    {/* Title */}
                    <div className="flex flex-col gap-3">
                        <label className="text-mainGrey-medium text-lg font-bold">Title</label>
                        <input
                            type="text"
                            name="title"
                            placeholder="e.g. Take coffee break"
                            className="w-full p-2 border rounded-lg dark:bg-mainGrey-veryDark dark:text-white"
                            required
                        />
                    </div>

                    {/* Description */}
                    <div className="flex flex-col gap-3">
                        <label className="text-mainGrey-medium text-lg font-bold">Description</label>
                        <textarea
                            name="description"
                            placeholder="e.g. It’s always good to take a break. This 15 minute break will recharge the batteries a little."
                            className="w-full p-2 border rounded-lg dark:bg-mainGrey-veryDark dark:text-white"
                            rows="3"
                        />
                    </div>

                    {/* Subtasks */}
                    <div className="flex flex-col gap-3">
                        <label className="text-mainGrey-medium text-lg font-bold">Subtasks</label>
                        {subtasks.map((subtask, index) => (
                            <div key={index} className="flex items-center gap-2">
                                <input
                                    type="text"
                                    value={subtask}
                                    onChange={(e) => handleSubtaskChange(index, e.target.value)}
                                    placeholder="e.g. Make coffee"
                                    className="w-full p-2 border rounded-lg dark:bg-mainGrey-veryDark dark:text-white"
                                />
                                {
                                    error && <span className="text-red-600">{error}</span>
                                }
                                <button
                                    type="button"
                                    onClick={() => removeSubtaskForm(index)}
                                    className="text-red-500 text-lg font-bold"
                                >
                                    ✕
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={addSubtaskForm}
                            className="w-full mt-4 bg-mainPurple-hover/20 text-mainPurple-main py-2 rounded-3xl transition-all text-lg font-semibold"
                        >
                            + Add New Subtask
                        </button>
                    </div>

                    {/* Status */}
                    <div className="flex flex-col gap-3">
                    <label className="text-mainGrey-medium text-lg font-bold">Status</label>
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="w-full p-2 border rounded-lg dark:bg-mainGrey-veryDark dark:text-white"
                        name="status"
                    >
                        <option value="Todo">Todo</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Review">Review</option>
                        <option value="Completed">Completed</option>
                        <option value="On Hold">On Hold</option>
                        <option value="Cancelled">Cancelled</option>
                    </select>
                    </div>


                    {/* Create Task Button */}
                    <button
                        type="submit"
                        className="w-full mt-4 bg-mainPurple-main text-white py-2 rounded-3xl hover:bg-mainPurple-hover transition-all text-lg font-semibold"
                    >
                        Create Task
                    </button>
                </form>
            </motion.div>
        </div>
    );
};

export default AddTaskModal;