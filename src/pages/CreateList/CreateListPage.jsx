import React, { useContext, useState } from "react";
import { TaskContext } from "../../context/TaskContext";
import { useNavigate } from "react-router-dom";

function CreateListPage() {
  const { addList } = useContext(TaskContext);
  const [name, setName] = useState("");
  const [status, setStatus] = useState("Pending"); // Default matches schema
  const [date, setDate] = useState(""); // Date is optional
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newList = {
      name,
      status,
      date: date ? new Date(date) : undefined, // Convert to Date object if provided
      tasks: [], // Empty array per schema
    };
    addList(newList);
    setName("");
    setStatus("Pending");
    setDate("");
    navigate("/lists-board");
  };

  return (
    <div className="container py-4">
      <h3 className="mb-1 fw-bold">Add New List</h3>
      <hr
        className="mb-4"
        style={{ borderTop: "2px solid #ddd", width: "160px" }}
      />

      <form
        onSubmit={handleSubmit}
        className="card p-4 shadow-sm rounded-4"
        style={{ maxWidth: "600px", margin: "auto" }}
      >
        <div className="mb-3">
          <label className="form-label">
            List Name <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            className="form-control rounded-3"
            required
            value={name}
            placeholder="e.g. Design tasks"
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Status</label>
          <select
            className="form-select rounded-3"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="form-label">Date</label>
          <input
            type="date"
            className="form-control rounded-3"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div className="text-end">
          <button
            type="submit"
            className="btn btn-sm btn-outline-primary px-4 rounded-pill shadow-sm"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateListPage;
