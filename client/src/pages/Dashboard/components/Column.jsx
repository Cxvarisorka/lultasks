// components/Column.js
import React from "react";

const statusColors = {
  Todo: "bg-red-500",
  "In Progress": "bg-yellow-400",
  Review: "bg-blue-400",
  Completed: "bg-green-500",
  "On Hold": "bg-orange-500",
  Cancelled: "bg-gray-500",
};

const ColumnHeader = ({ column, tasks }) => {
  const taskCount = tasks.filter((task) => task.columnId === column.id).length;
  return (
    <h2 className="flex items-center text-lg font-semibold text-mainGrey-veryDark dark:text-white">
      <div
        className="w-5 h-5 rounded-full mr-2"
        style={{ backgroundColor: column.color }}
      ></div>
      {column.name.toUpperCase()} ({taskCount})
    </h2>
  );
};

const TaskCard = ({ task, subtasks, openTaskModal }) => {
  const subtaskCount = subtasks.filter((st) => st.taskId === task.id).length;
  return (
    <div
      key={task.id}
      onClick={() => openTaskModal(task)}
      className="p-4 bg-white dark:bg-mainGrey-veryDark rounded-lg shadow-md hover:shadow-xl transition-all border dark:border-mainGrey-medium cursor-pointer"
    >
      <div className="flex justify-between items-center gap-4">
        <h3 className="text-lg font-semibold text-mainGrey-veryDark dark:text-white">
          {task.title}
        </h3>
        <div
          className={`px-3 py-1 rounded-lg text-sm font-medium text-white ${statusColors[task.status]}`}
        >
          {task.status}
        </div>
      </div>
      <div className="mt-2 text-mainGrey-medium text-sm font-medium">
        {subtaskCount} Subtasks
      </div>
    </div>
  );
};

const Column = ({ column, tasks, subtasks, openTaskModal, openAddTaskModal }) => {
    const columnTasks = tasks.filter((task) => task.columnId === column.id);
  
    return (
      <div className="p-4 min-w-[350px] flex flex-col rounded-lg bg-white dark:bg-mainGrey-dark shadow-lg border dark:border-mainGrey-medium">
        <ColumnHeader column={column} tasks={tasks} />
  
        <div className="mt-4 flex flex-col gap-4">
          {columnTasks.length > 0 && 
            columnTasks.map((task) => {
              return (
                <TaskCard
                  key={task.id}
                  task={task}
                  subtasks={subtasks}
                  openTaskModal={openTaskModal}
                />
              );
            })
          }
  
          {/* "Add Task" button is always visible */}
          <div className="flex justify-center items-center h-40 border-2 border-dashed border-mainGrey-medium dark:border-mainGrey-light rounded-lg">
            <button
              onClick={() => openAddTaskModal(column.id)}
              className="px-4 py-2 bg-mainPurple-main text-white font-semibold rounded-lg hover:bg-mainPurple-hover transition-all"
            >
              + Add Task
            </button>
          </div>
        </div>
      </div>
    );
};
  
  
  

export default Column;
