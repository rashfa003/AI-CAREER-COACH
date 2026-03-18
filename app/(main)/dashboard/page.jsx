import { getUserOnboardingStatus } from "@/actions/user";
import { getIndustryInsights } from "@/actions/dashboard";
import { redirect } from "next/navigation";
import DashboardView from "./_components/dashboard-view";

const IndustryInsightsPage = async () => {

    const { isOnboarded } = await getUserOnboardingStatus();
    
    if (!isOnboarded) {
      redirect("/onboarding");
    }

    const insights = await getIndustryInsights();
    
    // If insights is null (user has no industry), redirect to onboarding
    if (!insights) {
      redirect("/onboarding");
    }

  return (
  <div  className="w-full px-6 ">
    <DashboardView  insights={insights}/>
  </div>
  );
};

export default IndustryInsightsPage;