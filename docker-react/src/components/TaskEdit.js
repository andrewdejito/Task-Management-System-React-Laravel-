import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

function TaskEdit() {
  const { id } = useParams(); // 👈 get task ID from route
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    due_date: "",
    status: "pending",
  });
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const API_URL = `http://192.168.99.100:8082/api/tasks/${id}`; // ✅ fixed endpoint

  // Fetch existing task details
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
        setError("❌ Could not load task details.");
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

  // Handle update submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch(API_URL, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed to update task");
      await res.json();

      setSuccess("✅ Task updated successfully!");
      setTimeout(() => navigate("/tasks"), 1000);
    } catch (err) {
      console.error("Error updating task:", err);
      setError("❌ Failed to update task. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return <p className="text-center mt-4">Loading task...</p>;

  return (
    <div className="container mt-5">
      <div className="card shadow-sm">
        <div className="card-body">
          <h3 className="fw-bold text-success mb-3">✏️ Edit Task</h3>

          {/* Alerts */}
          {error && <div className="alert alert-danger">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label fw-semibold">Title</label>
              <input
                name="title"
                type="text"
                className="form-control"
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
                rows="3"
                value={form.description}
                onChange={handleChange}
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

            <div className="mb-3">
              <label className="form-label fw-semibold">Status</label>
              <select
                name="status"
                className="form-select"
                value={form.status}
                onChange={handleChange}
              >
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            <div className="d-flex justify-content-between align-items-center">
              <Link to="/tasks" className="btn btn-outline-secondary">
                ← Back
              </Link>

              <button
                type="submit"
                className="btn btn-success px-4"
                disabled={loading}
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default TaskEdit;
