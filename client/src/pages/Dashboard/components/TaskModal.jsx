import SubtasksSection from "./SubTasksSection";
import verticalEllipsis from "../../../assets/icon-vertical-ellipsis.svg";
import { motion } from "framer-motion";

const TaskModal = ({ task, subtasks, closeModal }) => {
    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={closeModal} // Close modal when clicking outside
        >
            <motion.div
                className="bg-white flex flex-col gap-6 dark:bg-mainGrey-dark p-8 rounded-lg shadow-lg w-1/4"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
            >
                {/* Modal Header */}
                <div className="flex justify-between items-center">
                    <h2 className="text-3xl dark:text-white text-mainGrey-veryDark font-semibold">{task.title}</h2>
                    <button
                        className="text-mainGrey-medium dark:text-white dark:hover:text-white hover:text-mainGrey-dark"
                    >
                        <img src={verticalEllipsis}/>
                    </button>
                </div>

                {/* Task Description */}
                <p className="text-mainGrey-medium text-xl">{task.description}</p> 

                {/* Subtasks Section */}
                <SubtasksSection subtasks={subtasks}/>

                {/* Task Status */}
                <p>{task.status}</p>
            </motion.div>
        </div>
    );
};

export default TaskModal