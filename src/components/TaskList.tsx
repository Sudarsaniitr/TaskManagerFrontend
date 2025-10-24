import React from "react";
import { Task } from "../types";

interface Props {
  tasks: Task[];
  toggleTask: (id: number) => void;
  deleteTask: (id: number) => void;
  filter: string;
}

export default function TaskList({ tasks, toggleTask, deleteTask, filter }: Props) {
  const filtered = tasks.filter((t) =>
    filter === "all" ? true : filter === "completed" ? t.isCompleted : !t.isCompleted
  );

  if (filtered.length === 0) return <p className="text-muted">No tasks to display</p>;

  return (
    <ul className="list-group">
      {filtered.map((t) => (
        <li key={t.id} className="list-group-item d-flex justify-content-between align-items-center">
          <span
            style={{
              textDecoration: t.isCompleted ? "line-through" : "none",
              cursor: "pointer",
            }}
            onClick={() => toggleTask(t.id)}
          >
            {t.description}
          </span>
          <button className="btn btn-sm btn-danger" onClick={() => deleteTask(t.id)}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}
