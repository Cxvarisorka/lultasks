import { useState } from "react";


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

export default SubtasksSection;