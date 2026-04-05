"use client";

import { useState } from "react";

const JobForm = ({ onAddJob }) => {
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [location, setLocation] = useState("");
  const [priority, setPriority] = useState("Medium");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!company.trim() || !role.trim() || !location.trim()) {
      return;
    }

    onAddJob({
      company: company.trim(),
      role: role.trim(),
      location: location.trim(),
      priority,
      status: "Applied",
      notes: [],
    });

    setCompany("");
    setRole("");
    setLocation("");
    setPriority("Medium");
  };

  return (
    <div className="border border-gray-700 p-4 rounded-lg mb-6 bg-gray-900">
      <h2 className="text-xl font-bold mb-4">➕ Add Custom Job</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          placeholder="Company"
          className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white"
        />
        <input
          value={role}
          onChange={(e) => setRole(e.target.value)}
          placeholder="Role"
          className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white"
        />
        <input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Location"
          className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white"
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white"
        >
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded"
        >
          Add Job
        </button>
      </form>
    </div>
  );
};

export default JobForm;