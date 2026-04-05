"use client";
import { useState } from "react";

const RecommendedJobs = ({ role, onApply }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchJobs = async () => {
    if (!role) return;

    setLoading(true);
    const res = await fetch(`/api/jobs?role=${role}`);
    const data = await res.json();
    setJobs(data);
    setLoading(false);
  };

  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold mb-4">
         Find Real Jobs
      </h2>

      {/* Search Button */}
      <button
        onClick={fetchJobs}
        className="bg-white text-black px-4 py-2 rounded mb-4"
      >
        Search Jobs
      </button>

      {loading && <p>Loading jobs...</p>}

      {jobs.map((job) => (
        <div
          key={job.id}
          className="border border-gray-700 p-4 rounded mb-3"
        >
          <h3 className="font-bold">{job.company_name}</h3>
          <p>{job.title}</p>
          <p className="text-sm text-gray-400">
            {job.candidate_required_location}
          </p>

          <div className="flex justify-between mt-3">
            {/* REAL APPLY */}
            <a
              href={job.url}
              target="_blank"
              className="text-blue-400"
            >
              Apply Now
            </a>

            {/* SAVE TO TRACKER */}
            <button
              onClick={() =>
                onApply({
                  company: job.company_name,
                  role: job.title,
                  location: job.candidate_required_location,
                })
              }
              className="bg-gray-200 text-black px-3 py-1 rounded"
            >
              Save
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecommendedJobs;