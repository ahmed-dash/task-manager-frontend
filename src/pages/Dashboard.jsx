import { useEffect, useState } from "react";

import { createTask, deleteTask, listTasks, updateTask } from "../api/tasks";
import Navbar from "../components/Navbar";
import TaskForm from "../components/TaskForm";
import TaskItem from "../components/TaskItem";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    listTasks()
      .then(setTasks)
      .catch(() => setError("Couldn't load your tasks."))
      .finally(() => setIsLoading(false));
  }, []);

  const handleCreate = async (taskData) => {
    const newTask = await createTask(taskData);
    setTasks((prev) => [newTask, ...prev]);
  };

  const handleUpdate = async (taskId, changes) => {
    const updated = await updateTask(taskId, changes);
    setTasks((prev) => prev.map((t) => (t.id === taskId ? updated : t)));
  };

  const handleDelete = async (taskId) => {
    await deleteTask(taskId);
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
  };

  return (
    <>
      <Navbar />
      <main className="dashboard">
        <h1>Your tasks</h1>
        <TaskForm onCreate={handleCreate} />

        {isLoading && <p>Loading tasks...</p>}
        {error && <p className="form-error">{error}</p>}

        {!isLoading && tasks.length === 0 && (
          <p className="empty-state">No tasks yet — add your first one above.</p>
        )}

        <ul className="task-list">
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
            />
          ))}
        </ul>
      </main>
    </>
  );
}
