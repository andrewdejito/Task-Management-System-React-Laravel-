import React, { useState, useEffect } from "react";
import {Link } from "react-router-dom";

function TaskEdit({ taskId, onTaskUpdated, onBack }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    due_date: "",
    status: "",
  });
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const API_URL = `http://192.168.99.100:8082/api/task/${taskId}`;

  // Fetch the existing task data
  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error("Failed to fetch task details");
        const data = await res.json();
        setForm({
          title: data.title || "",
          description: data.description || "",
          due_date: data.due_date || "",
          status: data.status || "pending",
        });
      } catch (err) {
        console.error("Error fetching task:", err);
      } finally {
        setFetching(false);
      }
    };

    fetchTask();
  }, [API_URL]);

  // Handle form input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle submit/update
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(API_URL, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed to update task");

      await res.json();
      if (onTaskUpdated) onTaskUpdated();
    } catch (err) {
      console.error("Error updating task:", err);
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return <p className="text-center mt-4">Loading task...</p>;

  return (
    <div className="container mt-4">
      <h3>Edit Task</h3>
      <form onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="Title"
          className="form-control mb-2"
          value={form.title}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          className="form-control mb-2"
          value={form.description}
          onChange={handleChange}
        />

        <input
          type="date"
          name="due_date"
          className="form-control mb-2"
          value={form.due_date}
          onChange={handleChange}
        />

        <select
          name="status"
          className="form-control mb-3"
          value={form.status}
          onChange={handleChange}
        >
          <option value="pending">Pending</option>
          <option value="in_progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>

        <div className="d-flex justify-content-between">
          <button type="submit" className="btn btn-success" disabled={loading}>
            {loading ? "Saving..." : "Save Changes"}
          </button>

          <Link to="/tasks" className="btn btn-secondary ms-2">
                              Back
                            </Link>
        </div>
      </form>
    </div>
  );
}

export default TaskEdit;
