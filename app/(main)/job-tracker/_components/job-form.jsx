"use client";
import { useState } from "react";

const JobForm = () => {
  const [form, setForm] = useState({
    company: "",
    role: "",
    location: "",
    status: "Applied",
    link: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Job Added:", form);
    alert("Job added (frontend only for now)");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        name="company"
        placeholder="Company"
        onChange={handleChange}
        className="w-full p-2 rounded bg-gray-800"
      />

      <input
        name="role"
        placeholder="Role"
        onChange={handleChange}
        className="w-full p-2 rounded bg-gray-800"
      />

      <input
        name="location"
        placeholder="Location"
        onChange={handleChange}
        className="w-full p-2 rounded bg-gray-800"
      />

      <select
        name="status"
        onChange={handleChange}
        className="w-full p-2 rounded bg-gray-800"
      >
        <option>Applied</option>
        <option>Interview</option>
        <option>Offer</option>
        <option>Rejected</option>
      </select>

      <input
        name="link"
        placeholder="Job Link"
        onChange={handleChange}
        className="w-full p-2 rounded bg-gray-800"
      />

      <button className="bg-white text-black px-4 py-2 rounded">
        Add Job
      </button>
    </form>
  );
};

export default JobForm;