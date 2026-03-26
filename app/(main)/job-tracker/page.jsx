import JobForm from "./_components/job-form";
import JobList from "./_components/job-list";

const JobTrackerPage = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">
        Job Application Tracker
      </h1>
      <JobForm/>
      <JobList/>

      
    </div>
  );
};

export default JobTrackerPage;