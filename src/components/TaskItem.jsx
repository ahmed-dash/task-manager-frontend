import { useState } from "react";

const STATUS_LABELS = {
  todo: "To do",
  in_progress: "In progress",
  done: "Done",
};

const NEXT_STATUS = {
  todo: "in_progress",
  in_progress: "done",
  done: "todo",
};

export default function TaskItem({ task, onUpdate, onDelete }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleAdvanceStatus = () => {
    onUpdate(task.id, { status: NEXT_STATUS[task.status] });
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await onDelete(task.id);
    } catch {
      setIsDeleting(false);
    }
  };

  return (
    <li className={`task-item task-item--${task.status}`}>
      <div className="task-item-main">
        <p className="task-title">{task.title}</p>
        {task.description && <p className="task-description">{task.description}</p>}
      </div>
      <div className="task-item-actions">
        <button className="status-badge" onClick={handleAdvanceStatus} title="Click to advance status">
          {STATUS_LABELS[task.status]}
        </button>
        <button
          className="btn btn-danger"
          onClick={handleDelete}
          disabled={isDeleting}
        >
          {isDeleting ? "..." : "Delete"}
        </button>
      </div>
    </li>
  );
}
