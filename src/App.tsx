// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { Task } from "./types";
// import TaskInput from "./components/TaskInput";
// import TaskList from "./components/TaskList";

// const API_URL = "https://taskmanagerbackend-2e67.onrender.com/api/tasks";
// // const API_URL = "http://localhost:5053/api/tasks";

// export default function App() {
//   const [tasks, setTasks] = useState<Task[]>([]);
//   const [newTask, setNewTask] = useState("");
//   const [filter, setFilter] = useState("all");

//   const fetchTasks = async () => {
//     const local = localStorage.getItem("tasks");
//     if (local) setTasks(JSON.parse(local));
//     else {
//       const res = await axios.get(API_URL);
//       setTasks(res.data);
//     }
//   };

//   useEffect(() => {
//     fetchTasks();
//   }, []);

//   useEffect(() => {
//     localStorage.setItem("tasks", JSON.stringify(tasks));
//   }, [tasks]);

//   const addTask = async () => {
//     if (!newTask.trim()) return;
//     const res = await axios.post(API_URL, { description: newTask });
//     setTasks([...tasks, res.data]);
//     setNewTask("");
//   };

//   const toggleTask = async (id: number) => {
//     await axios.patch(`${API_URL}/${id}`);
//     setTasks(
//       tasks.map((t) =>
//         t.id === id ? { ...t, isCompleted: !t.isCompleted } : t
//       )
//     );
//   };

//   const deleteTask = async (id: number) => {
//     await axios.delete(`${API_URL}/${id}`);
//     setTasks(tasks.filter((t) => t.id !== id));
//   };

//   return (
//     <div className="container mt-5">
//       <h3 className="mb-4 text-center">Task Manager</h3>
//       <TaskInput newTask={newTask} setNewTask={setNewTask} addTask={addTask} />
//       <div className="btn-group mb-3">
//         {["all", "active", "completed"].map((f) => (
//           <button
//             key={f}
//             className={`btn btn-outline-secondary ${filter === f ? "active" : ""}`}
//             onClick={() => setFilter(f)}
//           >
//             {f.charAt(0).toUpperCase() + f.slice(1)}
//           </button>
//         ))}
//       </div>
//       <TaskList
//         tasks={tasks}
//         toggleTask={toggleTask}
//         deleteTask={deleteTask}
//         filter={filter}
//       />
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Task } from "./types";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";

const API_URL = "https://taskmanagerbackend-2e67.onrender.com/api/tasks";

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");
  const [filter, setFilter] = useState("all");

  const fetchTasks = async () => {
    const res = await axios.get(API_URL);
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async () => {
    if (!newTask.trim()) return;
    const res = await axios.post(API_URL, { description: newTask });
    setTasks([...tasks, res.data]);
    setNewTask("");
  };

  const toggleTask = async (task: Task) => {
    const updated = { ...task, isCompleted: !task.isCompleted };
    await axios.put(`${API_URL}/${task.id}`, updated);
    setTasks(tasks.map((t) => (t.id === task.id ? updated : t)));
  };

  const deleteTask = async (id: string) => {
    await axios.delete(`${API_URL}/${id}`);
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const filteredTasks = tasks.filter((t) =>
    filter === "completed" ? t.isCompleted :
    filter === "active" ? !t.isCompleted :
    true
  );

  return (
    <div className="container mt-5">
      <h3 className="mb-4 text-center">Task Manager</h3>
      <TaskInput newTask={newTask} setNewTask={setNewTask} addTask={addTask} />
      <div className="btn-group mb-3">
        {["all", "active", "completed"].map((f) => (
          <button
            key={f}
            className={`btn btn-outline-secondary ${filter === f ? "active" : ""}`}
            onClick={() => setFilter(f)}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>
      <TaskList tasks={filteredTasks} toggleTask={toggleTask} deleteTask={deleteTask} />
    </div>
  );
}
