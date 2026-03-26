"use client";
import { useState } from "react";

const initialJobs = [
  {
    company: "Google",
    role: "Frontend Developer",
    status: "Applied",
    location: "Bangalore",
    link: "#",
  },
];

const JobList = () => {
  const [jobs, setJobs] = useState(initialJobs);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const getStatusColor = (status) => {
    switch (status) {
      case "Applied":
        return "text-gray-400";
      case "Interview":
        return "text-blue-400";
      case "Offer":
        return "text-green-400";
      case "Rejected":
        return "text-red-400";
      default:
        return "";
    }
  };

  const deleteJob = (index) => {
    const updated = jobs.filter((_, i) => i !== index);
    setJobs(updated);
  };

  const filteredJobs = jobs.filter((job) => {
    return (
      (filter === "All" || job.status === filter) &&
      (job.company.toLowerCase().includes(search.toLowerCase()) ||
        job.role.toLowerCase().includes(search.toLowerCase()))
    );
  });

  return (
    <div className="mt-6">
      {/* 🔍 Search */}
      <input
        placeholder="Search company or role..."
        className="w-full p-2 mb-4 rounded bg-gray-800 border border-gray-700"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* 🔘 Filters */}
      <div className="flex gap-2 mb-4">
        {["All", "Applied", "Interview", "Offer", "Rejected"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className="px-3 py-1 border rounded"
          >
            {f}
          </button>
        ))}
      </div>

      {/* 📊 Stats */}
      <div className="flex gap-4 mb-4 text-sm">
        <p>Total: {jobs.length}</p>
        <p>Applied: {jobs.filter(j => j.status === "Applied").length}</p>
        <p>Interview: {jobs.filter(j => j.status === "Interview").length}</p>
        <p>Offer: {jobs.filter(j => j.status === "Offer").length}</p>
      </div>

      {/* 📋 Job Cards */}
      {filteredJobs.length === 0 ? (
        <p className="text-gray-400">No jobs found</p>
      ) : (
        filteredJobs.map((job, index) => (
          <div
            key={index}
            className="border border-gray-700 p-4 mb-3 rounded-lg"
          >
            <h2 className="font-bold text-lg">{job.company}</h2>
            <p>{job.role}</p>
            <p className="text-sm text-gray-400">{job.location}</p>

            <div className="flex justify-between items-center mt-2">
              <span className={getStatusColor(job.status)}>
                {job.status}
              </span>

              <div className="flex gap-3">
                <a
                  href={job.link}
                  target="_blank"
                  className="text-blue-400 underline text-sm"
                >
                  View
                </a>

                <button
                  onClick={() => deleteJob(index)}
                  className="text-red-400 text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default JobList;