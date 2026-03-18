import StratsCards from "./_components/stats-cards";
import PerfromanceChart from "./_components/performance-chart";
import QuizResultList from "./_components/quiz-list";
import { getAssessments } from "@/actions/interview";

const InterviewPage = async () => {
  const assessments = await getAssessments();
  return (
    <div>
      <h1 className="text-6xl font-bold mb-5 gradient-title">Interview Preperation
      </h1>
      <div className="space-y-6">
        <StratsCards assessments={assessments}/>
        <PerfromanceChart assessments={assessments}/>
        <QuizResultList assessments={assessments}/>

      </div>
    </div>
  );

};

export default InterviewPage;