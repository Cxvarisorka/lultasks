import { createContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export const InfoContext = createContext();

const InfoProvider = ({ children }) => {
    const [boards, setBoards] = useState([
  
    ]);
    const [columns, setColumns] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [subtasks, setSubtasks] = useState([]);
    const [activeBoardId, setActiveBoardId] = useState(boards[0]?.id || "");

    const addBoard = (name) => {
        if (!name.trim() || boards.some(board => board.name === name)) return;
        const boardId = uuidv4();
        const newBoard = { id: boardId, name };
        setBoards([...boards, newBoard]);
        setActiveBoardId(boardId);
    };

    const addColumn = (boardId, name, color) => {
        if (!name.trim() || !boards.some(board => board.id === boardId)) return;
        const newColumn = { id: uuidv4(), boardId, name, color };
        setColumns([...columns, newColumn]);
    };

    const addTask = (columnId, title, description, status, initialSubtasks) => {
        if (!title.trim() || !columns.some(column => column.id === columnId)) return null;
  
        const taskId = uuidv4();
        const newTask = { id: taskId, columnId, title, description, status };
        
        setTasks(prev => [...prev, newTask]);
        
        const newSubtasks = initialSubtasks.map(subtaskTitle => ({
            id: uuidv4(),
            taskId,
            title: subtaskTitle,
            completed: false
        }));
        
        setSubtasks(prev => [...prev, ...newSubtasks]);
    };

    const addSubtask = (taskId, title, completed = false) => {
        if (!title.trim() || !tasks.some(task => task.id === taskId)) return;
        const newSubtask = { id: uuidv4(), taskId, title, completed };
        setSubtasks([...subtasks, newSubtask]);
    };

    const deleteBoard = (boardId) => {
        setBoards(boards.filter(board => board.id !== boardId));
        setColumns(columns.filter(column => column.boardId !== boardId));
        setTasks(tasks.filter(task => !columns.some(col => col.boardId === boardId && col.id === task.columnId)));
        setSubtasks(subtasks.filter(subtask => tasks.some(task => task.id === subtask.taskId)));
    };

    const deleteColumn = (columnId) => {
        setColumns(columns.filter(column => column.id !== columnId));
        setTasks(tasks.filter(task => task.columnId !== columnId));
        setSubtasks(subtasks.filter(subtask => tasks.some(task => task.id === subtask.taskId)));
    };

    const deleteTask = (taskId) => {
        setTasks(tasks.filter(task => task.id !== taskId));
        setSubtasks(subtasks.filter(subtask => subtask.taskId !== taskId));
    };

    const deleteSubtask = (subtaskId) => {
        setSubtasks(subtasks.filter(subtask => subtask.id !== subtaskId));
    };

    return (
        <InfoContext.Provider
            value={{
                boards,
                columns,
                tasks,
                subtasks,
                activeBoardId,
                setActiveBoardId,
                addBoard,
                addColumn,
                addTask,
                addSubtask,
                deleteBoard,
                deleteColumn,
                deleteTask,
                deleteSubtask,
            }}
        >
            {children}
        </InfoContext.Provider>
    );
};

export default InfoProvider;
