import React, { useEffect, useState } from "react";
import "./styles/app.css";

function App() {
  const [tasks, setTasks] = useState([]);

  // Simple test fetch to confirm API connectivity
  useEffect(() => {
    fetch("http://localhost:8000/api/tasks")
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((err) => console.error("API connection error:", err));
  }, []);

  return (
    <div className="app-container">
      <h1>Task Management System</h1>
      <p>This is the initial React setup connected to Laravel API.</p>

      <h3>Task List (Sample Data)</h3>
      <ul>
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <li key={task.id}>
              <strong>{task.title}</strong> — {task.status}
            </li>
          ))
        ) : (
          <p>No tasks yet or API not connected.</p>
        )}
      </ul>
    </div>
  );
}

export default App;
