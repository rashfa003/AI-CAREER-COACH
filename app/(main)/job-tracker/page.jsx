"use client";

import { useState, useEffect } from "react";
import JobForm from "./_components/job-form";
import JobList from "./_components/job-list";
import ActivityFeed from "./_components/activity-feed";
import ApplyJobs from "./_components/apply-jobs";

const JobTrackerPage = () => {
  const [jobs, setJobs] = useState([]);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await fetch("/api/job");
      const data = await response.json();
      if (data.success) {
        setJobs(data.jobs);
      } else {
        console.error("Failed to fetch jobs:", data.error);
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  const addActivity = (message) => {
    setActivities((prev) => [{ message, time: Date.now() }, ...prev]);
  };

  const makeJob = (job) => ({
    id: job.id || `${Date.now()}-${Math.random()}`,
    status: job.status || "Applied",
    priority: job.priority || "Medium",
    notes: job.notes || [],
    location: job.location || "Remote",
    ...job,
  });

  const handleAddJob = async (job) => {
    try {
      const response = await fetch("/api/job", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(job),
      });
      const data = await response.json();
      if (data.success) {
        const newJob = makeJob(data.job);
        setJobs((prev) => [newJob, ...prev]);
        addActivity(`Applied to ${newJob.company} - ${newJob.role}`);
      } else {
        console.error("Failed to add job:", data.error);
        alert("Failed to add job: " + data.error);
      }
    } catch (error) {
      console.error("Error adding job:", error);
      alert("Error adding job: " + error.message);
    }
  };

  const handleStatusChange = (index, newStatus) => {
    setJobs((prev) => {
      const updated = [...prev];
      const item = updated[index];
      if (!item) return prev;
      updated[index] = { ...item, status: newStatus };
      addActivity(`Status updated to ${newStatus} for ${item.company} (${item.role})`);
      return updated;
    });
  };

  const handleAddNote = (index, note) => {
    setJobs((prev) => {
      const updated = [...prev];
      const item = updated[index];
      if (!item) return prev;
      const newNotes = [...(item.notes || []), note];
      updated[index] = { ...item, notes: newNotes };
      addActivity(`Added note for ${item.company}: "${note}"`);
      return updated;
    });
  };

  const stats = {
    total: jobs.length,
    applied: jobs.filter((j) => j.status === "Applied").length,
    interview: jobs.filter((j) => j.status === "Interview").length,
    offer: jobs.filter((j) => j.status === "Offer").length,
    rejected: jobs.filter((j) => j.status === "Rejected").length,
    highPriority: jobs.filter((j) => j.priority === "High").length,
  };

  if (loading) {
    return <div className="p-6">Loading jobs...</div>;
  }

  return (
    <div className="p-6 flex flex-col space-y-6">
      <h1 className="text-6xl font-bold mb-5 gradient-title"> Smart Job Tracker</h1>

      <ApplyJobs />

      <JobForm onAddJob={handleAddJob} />

      <div className="border border-gray-700 p-4 rounded-lg bg-gray-900">
        <h2 className="text-xl font-semibold mb-3"> Career Stats</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
          <div className="p-2 border border-gray-700 rounded">Total: {stats.total}</div>
          <div className="p-2 border border-gray-700 rounded">Applied: {stats.applied}</div>
          <div className="p-2 border border-gray-700 rounded">Interview: {stats.interview}</div>
          <div className="p-2 border border-gray-700 rounded">Offer: {stats.offer}</div>
          <div className="p-2 border border-gray-700 rounded">Rejected: {stats.rejected}</div>
          <div className="p-2 border border-gray-700 rounded">High Priority: {stats.highPriority}</div>
        </div>
      </div>

      <JobList jobs={jobs} onStatusChange={handleStatusChange} onAddNote={handleAddNote} />

      <ActivityFeed activities={activities} />
    </div>
  );
};

export default JobTrackerPage;