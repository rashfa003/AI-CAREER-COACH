import React from "react";

const MainLayout = async ({ children }) => {
  // Redirect to onboarding
  return <div className="container mt-24 mb-20">{children}</div>;
};

export default MainLayout;
