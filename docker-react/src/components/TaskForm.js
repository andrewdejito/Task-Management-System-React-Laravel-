import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function TaskForm() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    due_date: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const API_URL = "http://192.168.99.100:8082/api/tasks"; // ✅ fixed endpoint

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

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

      setSuccess("✅ Task added successfully!");
      setForm({
        title: "",
        description: "",
        due_date: "",
      });

      // Redirect to task list after short delay
      setTimeout(() => navigate("/tasks"), 1200);
    } catch (err) {
      console.error("Error adding task:", err);
      setError("❌ Unable to add task. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-sm">
        <div className="card-body">
          <h3 className="fw-bold text-primary mb-3">📝 Add New Task</h3>

          {/* Alert messages */}
          {error && <div className="alert alert-danger">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label fw-semibold">Title</label>
              <input
                name="title"
                type="text"
                className="form-control"
                placeholder="Enter task title"
                value={form.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Description</label>
              <textarea
                name="description"
                className="form-control"
                placeholder="Enter task description"
                value={form.description}
                onChange={handleChange}
                rows="3"
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Due Date</label>
              <input
                type="date"
                name="due_date"
                className="form-control"
                value={form.due_date}
                onChange={handleChange}
              />
            </div>

            <div className="d-flex justify-content-between align-items-center">
              <Link to="/tasks" className="btn btn-outline-secondary">
                ← Back
              </Link>
              <button
                type="submit"
                className="btn btn-primary px-4"
                disabled={loading}
              >
                {loading ? "Adding..." : "Add Task"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default TaskForm;
