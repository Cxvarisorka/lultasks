import { useContext, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Layout from "../components/shared/Layout";
import { InfoContext } from "../context/InfoContext";

// svg
import verticalEllipsis from "../assets/icon-vertical-ellipsis.svg";
  

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

const SubtasksSection = ({ subtasks }) => {
    const [checkedSubtasks, setCheckedSubtasks] = useState({});

    const handleCheckboxChange = (subtaskId) => {
        setCheckedSubtasks((prev) => ({
            ...prev,
            [subtaskId]: !prev[subtaskId],
        }));
    };

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold dark:text-white">
                Subtasks ({subtasks.filter((subtask) => subtask.completed).length} of {subtasks.length})
            </h3>
            <div className="space-y-2">
                {subtasks.length > 0 ? (
                    subtasks.map((subtask) => {
                        const isChecked = checkedSubtasks[subtask.id] ?? subtask.completed;
                        return (
                            <div
                                key={subtask.id}
                                className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${
                                    isChecked
                                        ? 'bg-purple-500/20 border border-purple-500'
                                        : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
                                }`}
                            >
                                <input
                                    type="checkbox"
                                    checked={isChecked}
                                    onChange={() => handleCheckboxChange(subtask.id)}
                                    className="form-checkbox h-5 w-5 text-purple-600 rounded focus:ring-purple-500 cursor-pointer"
                                />
                                <p
                                    className={`flex-1 text-sm ${
                                        isChecked
                                            ? 'line-through text-gray-500 dark:text-gray-400'
                                            : 'text-gray-700 dark:text-gray-200'
                                    }`}
                                >
                                    {subtask.title}
                                </p>
                            </div>
                        );
                    })
                ) : (
                    <p className="text-gray-500 dark:text-gray-400 text-sm italic">
                        No subtasks available.
                    </p>
                )}
            </div>
        </div>
    );
};

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
            </motion.div>
        </div>
    );
};

const statusColors = {
    "Todo": "bg-red-500",
    "In Progress": "bg-yellow-400",
    "Review": "bg-blue-400",
    "Completed": "bg-green-500",
    "On Hold": "bg-orange-500",
    "Cancelled": "bg-gray-500",
  };

const Dashboard = () => {
    const { boards, columns, tasks, subtasks, activeBoardId, addColumn, addTask } = useContext(InfoContext);
    
    const [isColumnModalOpen, setIsColumnModalOpen] = useState(false);
    const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
    const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
    const [activeTask, setActiveTask] = useState(null);
    const [columnId, setColumnId] = useState(null);

    const activeColumns = columns.filter(column => column.boardId === activeBoardId);

    // Function to handle opening the TaskModal with selected task
    const openTaskModal = (task) => {
        setActiveTask(task);
        setIsTaskModalOpen(true);
    };

    // Function to handle adding a new column
    const handleSubmit = (e, selectedColor) => {
        e.preventDefault();
        if (!e.target.columnName.value.trim()) return;
        
        addColumn(activeBoardId, e.target.columnName.value, selectedColor);
        setIsColumnModalOpen(false);
    };

    return (
        <Layout>
            {
                activeBoardId ? (
                    <>
                        <div className="p-5 w-full flex flex-col gap-5">
                            {activeColumns.length ? (
                                <div className="flex items-start gap-6 overflow-x-auto p-4">
                                    {activeColumns.map(column => (
                                        <div key={column.id} className="p-4 min-w-[350px] flex flex-col rounded-lg bg-white dark:bg-mainGrey-dark shadow-lg border dark:border-mainGrey-medium">
                                            {/* Column Header */}
                                            <h2 className="flex items-center text-lg font-semibold text-mainGrey-veryDark dark:text-white">
                                                <div className="w-5 h-5 rounded-full mr-2" style={{ backgroundColor: column.color }}></div>
                                                {column.name.toUpperCase()} ({tasks.filter(task => task.columnId === column.id).length})
                                            </h2>
                                
                                            {/* Task List */}
                                            <div className="mt-4 flex flex-col gap-4">
                                                {tasks.filter(task => task.columnId === column.id).length > 0 ? (
                                                    tasks.filter(task => task.columnId === column.id).map(task => (
                                                        <div 
                                                            key={task.id} 
                                                            onClick={() => openTaskModal(task)}
                                                            className="p-4 bg-white dark:bg-mainGrey-veryDark rounded-lg shadow-md hover:shadow-xl transition-all border dark:border-mainGrey-medium cursor-pointer"
                                                        >
                                                            <div className="flex justify-between items-center gap-4">
                                                                <h3 className="text-lg font-semibold text-mainGrey-veryDark dark:text-white">
                                                                    {task.title}
                                                                </h3>
                                                                <div className={`px-3 py-1 rounded-lg text-sm font-medium text-white ${statusColors[task.status]}`}>
                                                                    {task.status}
                                                                </div>
                                                            </div>

                                                            
                                                            <div className="mt-2 text-mainGrey-medium text-sm font-medium">
                                                                {subtasks.filter(subtask => subtask.taskId === task.id).length} Subtasks
                                                            </div>
                                                        </div>
                                                    ))
                                                ) : (
                                                    <div className="flex justify-center items-center h-40 border-2 border-dashed border-mainGrey-medium dark:border-mainGrey-light rounded-lg">
                                                        <button onClick={() =>{ setIsAddTaskModalOpen(true);
                                                        setColumnId(column.id);   
                                                        }} className="px-4 py-2 bg-mainPurple-main text-white font-semibold rounded-lg hover:bg-mainPurple-hover transition-all">
                                                            + Add Task
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                
                                    {/* Add New Column */}
                                    <div onClick={() => setIsColumnModalOpen(true)} className="p-4 justify-center items-center min-w-[350px] min-h-[450px] flex flex-col rounded-lg bg-mainGrey-medium/10 hover:bg-mainGrey-medium/20 cursor-pointer transition-all border-2 border-dashed border-mainGrey-medium dark:border-mainGrey-light">
                                        <h2 className="text-xl font-semibold text-mainGrey-medium dark:text-white">+ New Column</h2>
                                    </div>    
                                </div>
                            ) : (
                                <div className="flex flex-col gap-5 justify-center items-center mt-56 w-full">
                                    <h2 className="text-xl text-mainGrey-medium">This board is empty. Create a new column to get started.</h2>
                                    <button 
                                        onClick={() => setIsColumnModalOpen(true)}
                                        className="bg-mainPurple-main transition-all hover:bg-mainPurple-hover text-white py-3 px-6 rounded-3xl w-max"
                                    >
                                        + Add New Column
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Modals */}
                        {isColumnModalOpen && <AddColumnModal handleSubmit={handleSubmit} closeModal={() => setIsColumnModalOpen(false)} />}
                        {isAddTaskModalOpen && <AddTaskModal columnId={columnId} addTask={addTask} closeModal={() => setIsAddTaskModalOpen(false)} />}
                        {isTaskModalOpen && activeTask && (
                            <TaskModal 
                                task={activeTask} 
                                subtasks={subtasks.filter(subtask => subtask.taskId === activeTask.id)}
                                closeModal={() => setIsTaskModalOpen(false)}
                            />
                        )}
                    </>
                ) : (
                    <div>
                        <h1>There is no boards please add one</h1>
                    </div>
                )
            }

            
        </Layout>
    );
};

export default Dashboard;
