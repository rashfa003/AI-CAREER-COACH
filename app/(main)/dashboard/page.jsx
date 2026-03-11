import { getUserOnboardingStatus } from "@/actions/user";
import { getIndustryInsights } from "@/actions/dashboard";
import { redirect } from "next/navigation";
import DashboardView from "./_components/dashboard-view";

const IndustryInsightsPage = async () => {

    const { isOnboarded } = await getUserOnboardingStatus();
    const insights = await getIndustryInsights();

      if (!isOnboarded) {
        redirect("/onboarding");
      }
  return (
  <div  className="w-full px-6 ">
    <DashboardView  insights={insights}/>
  </div>
  );
};

export default IndustryInsightsPage;