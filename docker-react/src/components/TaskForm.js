import React, { useState } from "react";
import {Link } from "react-router-dom";

function TaskForm({ onTaskAdded, onBack }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    due_date: "",
  });
  const [loading, setLoading] = useState(false);

  const API_URL = "http://192.168.99.100:8082/api/task";

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          status: "pending",
        }),
      });

      if (!res.ok) throw new Error("Failed to add task");

      await res.json();

      if (onTaskAdded) onTaskAdded();

      // Reset form
      setForm({
        title: "",
        description: "",
        due_date: "",
      });
    } catch (err) {
      console.error("Error adding task:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h3>Add New Task</h3>
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

        <div className="d-flex justify-content-between">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Adding..." : "Add Task"}
          </button>

          <Link to="/tasks" className="btn btn-secondary ms-2">
                    Back
                  </Link>
        </div>
      </form>
    </div>
  );
}

export default TaskForm;
