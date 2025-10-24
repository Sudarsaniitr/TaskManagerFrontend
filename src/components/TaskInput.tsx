import React from "react";

interface TaskInputProps {
  newTask: string;
  setNewTask: (value: string) => void;
  addTask: () => void;
}

export default function TaskInput({ newTask, setNewTask, addTask }: TaskInputProps) {
  return (
    <div className="d-flex mb-3">
      <input
        className="form-control me-2"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Enter new task"
      />
      <button className="btn btn-primary" onClick={addTask}>
        Add
      </button>
    </div>
  );
}
