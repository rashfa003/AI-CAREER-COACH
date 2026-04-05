"use client";

import { useState } from "react";

export const generateAIJobQueries = (industry, role) => {
  const normalizedRole = role.trim().toLowerCase();
  const normalizedIndustry = industry.trim().toLowerCase();

  return [
    `${normalizedRole} jobs linkedin`,
    `${normalizedRole} ${normalizedIndustry} remote jobs`,
    `junior ${normalizedRole} hiring`,
    `${normalizedIndustry} ${normalizedRole} positions`,
    `${normalizedRole} opportunities`,
  ].map((q) => q.trim());
};

const industryOptions = [
  "Technology",
  "Marketing",
  "Finance",
  "HR",
  "Design",
  "Healthcare",
];

const ApplyJobs = () => {
  const [industry, setIndustry] = useState("Technology");
  const [role, setRole] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!role.trim()) {
      setError("Please enter a role to generate searches.");
      setSuggestions([]);
      return;
    }

    setLoading(true);
    setError("");
    setSuggestions([]);

    try {
      const response = await fetch("/api/ai-jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ industry, role }),
      });

      const data = await response.json().catch(() => null);
      if (!response.ok || !data) {
        // Fallback silently to local-generated suggestions
        setError("");
        setSuggestions(generateAIJobQueries(industry, role));
        return;
      }

      if (Array.isArray(data.suggestions) && data.suggestions.length > 0) {
        setSuggestions(data.suggestions);
      } else {
        setSuggestions(generateAIJobQueries(industry, role));
      }
    } catch (err) {
      console.error(err);
      setError("Failed to generate suggestions. Showing fallback results.");
      setSuggestions(generateAIJobQueries(industry, role));
    } finally {
      setLoading(false);
    }
  };

  const openLinkedIn = (query) => {
    const url = `https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(query)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="border border-gray-700 p-4 rounded-lg bg-gray-900 w-full">
      <h2 className="text-xl font-semibold mb-4"> Apply Jobs (AI Suggestions)</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
        <select
          value={industry}
          onChange={(e) => setIndustry(e.target.value)}
          className="p-2 bg-gray-800 border border-gray-700 rounded text-white"
        >
          {industryOptions.map((item) => (
            <option key={item} value={item}>{item}</option>
          ))}
        </select>

        <input
          value={role}
          onChange={(e) => setRole(e.target.value)}
          placeholder="Role (e.g. frontend developer)"
          className="p-2 bg-gray-800 border border-gray-700 rounded text-white"
        />

        <button
          onClick={handleSearch}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded"
          disabled={loading}
        >
          {loading ? "Generating..." : "Find Jobs with AI"}
        </button>
      </div>

      {error && <p className="text-sm text-red-300 mb-3">{error}</p>}

      <div className="space-y-2">
        {suggestions.map((query, idx) => (
          <div
            key={`${query}-${idx}`}
            className="border border-gray-700 p-3 rounded-lg bg-gray-800 hover:bg-gray-700 cursor-pointer"
            onClick={() => openLinkedIn(query)}
          >
            <p className="text-white">{query}</p>
            <p className="text-xs text-gray-400">Open LinkedIn search</p>
          </div>
        ))}

        {!loading && suggestions.length === 0 && (
          <p className="text-gray-400">Enter industry + role and tap Find Jobs with AI for links.</p>
        )}
      </div>
    </div>
  );
};

export default ApplyJobs;
