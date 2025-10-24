// import React from "react";
// import { Task } from "../types";

// interface Props {
//   tasks: Task[];
//   toggleTask: (id: number) => void;
//   deleteTask: (id: number) => void;
//   filter: string;
// }

// export default function TaskList({ tasks, toggleTask, deleteTask, filter }: Props) {
//   const filtered = tasks.filter((t) =>
//     filter === "all" ? true : filter === "completed" ? t.isCompleted : !t.isCompleted
//   );

//   if (filtered.length === 0) return <p className="text-muted">No tasks to display</p>;

//   return (
//     <ul className="list-group">
//       {filtered.map((t) => (
//         <li key={t.id} className="list-group-item d-flex justify-content-between align-items-center">
//           <span
//             style={{
//               textDecoration: t.isCompleted ? "line-through" : "none",
//               cursor: "pointer",
//             }}
//             onClick={() => toggleTask(t.id)}
//           >
//             {t.description}
//           </span>
//           <button className="btn btn-sm btn-danger" onClick={() => deleteTask(t.id)}>
//             Delete
//           </button>
//         </li>
//       ))}
//     </ul>
//   );
// }

import React from "react";
import { Task } from "../types";

interface TaskListProps {
  tasks: Task[];
  toggleTask: (task: Task) => void;   // ✅ accepts a Task
  deleteTask: (id: string) => void;   // ✅ id is a string (GUID)
}

export default function TaskList({ tasks, toggleTask, deleteTask }: TaskListProps) {
  if (tasks.length === 0) {
    return <p className="text-muted">No tasks available.</p>;
  }

  return (
    <ul className="list-group">
      {tasks.map((task) => (
        <li
          key={task.id}
          className="list-group-item d-flex justify-content-between align-items-center"
        >
          <div>
            <input
              type="checkbox"
              className="form-check-input me-2"
              checked={task.isCompleted}
              onChange={() => toggleTask(task)}  // ✅ passes full task
            />
            <span
              style={{
                textDecoration: task.isCompleted ? "line-through" : "none",
              }}
            >
              {task.description}
            </span>
          </div>
          <button
            className="btn btn-danger btn-sm"
            onClick={() => deleteTask(task.id)} // ✅ passes string GUID
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}
