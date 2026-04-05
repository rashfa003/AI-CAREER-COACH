"use client";

const ActivityFeed = ({ activities }) => {
  if (!activities || activities.length === 0) {
    return (
      <div className="mt-8 border border-gray-700 p-4 rounded-lg bg-gray-900">
        <h2 className="text-xl font-bold mb-3"> Career Activity</h2>
        <p className="text-gray-400">No activities yet.</p>
      </div>
    );
  }

  return (
    <div className="mt-8 border border-gray-700 p-4 rounded-lg bg-gray-900">
      <h2 className="text-xl font-bold mb-3"> Career Activity</h2>
      <ul className="space-y-2">
        {activities.map((activity, index) => (
          <li key={index} className="border border-gray-800 p-3 rounded bg-gray-800">
            <p className="text-sm text-gray-100">{activity.message}</p>
            <p className="text-xs text-gray-400 mt-1">{new Date(activity.time).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActivityFeed;
