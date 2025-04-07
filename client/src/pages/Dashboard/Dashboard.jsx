// pages/dashboard/index.jsx
import { useContext, useState } from "react";
import Layout from "../../components/shared/Layout";
import { InfoContext } from "../../context/InfoContext";
import TaskModal from "./components/TaskModal";
import AddTaskModal from "./components/AddTaskModal";
import AddColumnModal from "./components/AddColumnModal";
import Column from "./components/Column";

const Dashboard = () => {
  const {
    boards,
    columns,
    tasks,
    subtasks,
    activeBoardId,
    addColumn,
    addTask,
  } = useContext(InfoContext);

  const [isColumnModalOpen, setIsColumnModalOpen] = useState(false);
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [activeTask, setActiveTask] = useState(null);
  const [columnId, setColumnId] = useState(null);

  const activeColumns = columns.filter((column) => column.boardId === activeBoardId);

  const openTaskModal = (task) => {
    setActiveTask(task);
    setIsTaskModalOpen(true);
  };

  const handleSubmit = (e, selectedColor) => {
    e.preventDefault();
    if (!e.target.columnName.value.trim()) return;
    addColumn(activeBoardId, e.target.columnName.value, selectedColor);
    setIsColumnModalOpen(false);
  };

  const openAddTaskModal = (columnId) => {
    setColumnId(columnId);
    setIsAddTaskModalOpen(true);
  };

  return (
    <Layout>
      {activeBoardId ? (
        <>
          <div className="p-5 w-full flex flex-col gap-5">
            {activeColumns.length ? (
              <div className="flex items-start gap-6 overflow-x-auto p-4">
                {activeColumns.map((column) => (
                  <Column
                    key={column.id}
                    column={column}
                    tasks={tasks}
                    subtasks={subtasks}
                    openTaskModal={openTaskModal}
                    openAddTaskModal={openAddTaskModal}
                  />
                ))}

                {
                    activeColumns.length < 5 && (
                        <div
                            onClick={() => setIsColumnModalOpen(true)}
                            className="p-4 justify-center items-center min-w-[350px] min-h-[450px] flex flex-col rounded-lg bg-mainGrey-medium/10 hover:bg-mainGrey-medium/20 cursor-pointer transition-all border-2 border-dashed border-mainGrey-medium dark:border-mainGrey-light"
                            >
                            <h2 className="text-xl font-semibold text-mainGrey-medium dark:text-white">
                                + New Column
                            </h2>
                        </div>
                    ) 
                }

                
              </div>
            ) : (
              <div className="flex flex-col gap-5 justify-center items-center mt-56 w-full">
                <h2 className="text-xl text-mainGrey-medium">
                  This board is empty. Create a new column to get started.
                </h2>
                <button
                  onClick={() => setIsColumnModalOpen(true)}
                  className="bg-mainPurple-main transition-all hover:bg-mainPurple-hover text-white py-3 px-6 rounded-3xl w-max"
                >
                  + Add New Column
                </button>
              </div>
            )}
          </div>

          {isColumnModalOpen && (
            <AddColumnModal
              handleSubmit={handleSubmit}
              closeModal={() => setIsColumnModalOpen(false)}
            />
          )}
          {isAddTaskModalOpen && (
            <AddTaskModal
              columnId={columnId}
              addTask={addTask}
              closeModal={() => setIsAddTaskModalOpen(false)}
            />
          )}
          {isTaskModalOpen && activeTask && (
            <TaskModal
              task={activeTask}
              subtasks={subtasks.filter((subtask) => subtask.taskId === activeTask.id)}
              closeModal={() => setIsTaskModalOpen(false)}
            />
          )}
        </>
      ) : (
        <div>
          <h1>There is no boards please add one</h1>
        </div>
      )}
    </Layout>
  );
};

export default Dashboard;
