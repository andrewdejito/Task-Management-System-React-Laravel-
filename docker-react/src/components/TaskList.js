import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);
  const navigate = useNavigate();

  const API_URL = "http://192.168.99.100:8082/api/task";

  // Fetch all tasks
  const fetchTasks = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error("Failed to fetch tasks");
      const data = await res.json();
      setTasks(data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    } finally {
      setLoading(false);
    }
  };

  // Delete a task
  const deleteTask = async (id) => {
    setDeletingId(id);
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete task");
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (err) {
      console.error("Error deleting task:", err);
    } finally {
      setDeletingId(null);
    }
  };

  // Mark task as completed
  const markAsCompleted = async (id) => {
    setUpdatingId(id);
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "completed" }),
      });
      if (!res.ok) throw new Error("Failed to update task");
      setTasks(
        tasks.map((task) =>
          task.id === id ? { ...task, status: "completed" } : task
        )
      );
    } catch (err) {
      console.error("Error updating task:", err);
    } finally {
      setUpdatingId(null);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  if (loading) return <p>Loading tasks...</p>;

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Task List</h2>
        <button className="btn btn-primary" onClick={() => navigate("/add-task")}>
          + Add Task
        </button>
      </div>

      {tasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        <ul className="list-group">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <div>
                <strong>{task.title}</strong> — {task.status}
                <br />
                <small>{task.description}</small>
              </div>
              <div>
                <button
                  className="btn btn-success btn-sm me-2"
                  onClick={() => markAsCompleted(task.id)}
                  disabled={
                    updatingId === task.id || task.status === "completed"
                  }
                >
                  {updatingId === task.id
                    ? "Updating..."
                    : task.status === "completed"
                    ? "Done"
                    : "Mark Completed"}
                </button>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteTask(task.id)}
                  disabled={deletingId === task.id}
                >
                  {deletingId === task.id ? "Deleting..." : "Delete"}
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TaskList;
