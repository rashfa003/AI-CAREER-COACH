"use client";

import { useState } from "react";

const statusOptions = ["Applied", "Interview", "Offer", "Rejected", "Accepted"];

const priorityClasses = {
  High: "bg-red-500",
  Medium: "bg-yellow-500",
  Low: "bg-green-500",
};

const JobList = ({ jobs, onStatusChange, onAddNote }) => {
  const [noteInputs, setNoteInputs] = useState({});

  const handleNoteChange = (key, value) => {
    setNoteInputs((prev) => ({ ...prev, [key]: value }));
  };

  const handleNoteSubmit = (index) => {
    const note = noteInputs[index]?.trim();
    if (!note) return;

    onAddNote(index, note);
    setNoteInputs((prev) => ({ ...prev, [index]: "" }));
  };

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4"> Applied Jobs</h2>

      {jobs.length === 0 && <p className="text-gray-400">No jobs applied yet</p>}

      {jobs.map((job, index) => (
        <div key={job.id || index} className="border border-gray-700 p-4 rounded-lg mb-3 bg-gray-900">
          <div className="flex justify-between items-start gap-2">
            <div>
              <h3 className="font-bold text-lg">{job.company}</h3>
              <p>{job.role}</p>
              <p className="text-sm text-gray-400">{job.location}</p>
            </div>
            <span className={`text-xs text-white px-2 py-1 rounded ${priorityClasses[job.priority] || "bg-gray-400"}`}>
              {job.priority}
            </span>
          </div>

          <div className="mt-3 flex items-center gap-2">
            <label className="text-sm text-gray-400">Status:</label>
            <select
              value={job.status}
              onChange={(e) => onStatusChange(index, e.target.value)}
              className="p-1 bg-gray-800 border border-gray-700 rounded"
            >
              {statusOptions.map((status) => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>

          <div className="mt-4">
            <h4 className="font-semibold">Notes</h4>
            {(!job.notes || job.notes.length === 0) && <p className="text-sm text-gray-400">No notes yet.</p>}
            {job.notes?.map((note, noteIndex) => (
              <p key={noteIndex} className="text-sm text-gray-200 border border-gray-700 p-2 rounded mt-1">
                {note}
              </p>
            ))}

            <div className="mt-2 flex gap-2">
              <input
                value={noteInputs[index] || ""}
                onChange={(e) => handleNoteChange(index, e.target.value)}
                placeholder="Add a quick update"
                className="flex-1 p-2 bg-gray-800 border border-gray-700 rounded text-white"
              />
              <button
                onClick={() => handleNoteSubmit(index)}
                className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-white"
              >
                Add Note
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default JobList;