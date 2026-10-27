
import { useState } from "react";

export default function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  function addTask(e) {
    e.preventDefault();

    if (!task.trim()) return;

    setTasks([
      ...tasks,
      { id: Date.now(), text: task.trim(), completed: false }
    ]);

    setTask("");
  }

  function toggleTask(id) {
    setTasks(
      tasks.map((item) =>
        item.id === id
          ? { ...item, completed: !item.completed }
          : item
      )
    );
  }

  function deleteTask(id) {
    setTasks(tasks.filter((item) => item.id !== id));
  }

  return (
    <div className="container">
      <h1>My To-Do List</h1>
      <p>Organize your daily tasks</p>

      <form onSubmit={addTask}>
        <input
          type="text"
          placeholder="Enter a task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button type="submit">Add Task</button>
      </form>

      {tasks.length === 0 ? (
        <p>No tasks added yet.</p>
      ) : (
        <ul>
          {tasks.map((item) => (
            <li key={item.id}>
              <label className={item.completed ? "completed" : ""}>
                <input
                  type="checkbox"
                  checked={item.completed}
                  onChange={() => toggleTask(item.id)}
                />
                {item.text}
              </label>

              <button
                className="delete"
                onClick={() => deleteTask(item.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}

      <p>
        Completed: {tasks.filter((item) => item.completed).length}
        {" / "}
        {tasks.length}
      </p>
    </div>
  );
}
