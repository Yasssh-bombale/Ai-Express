import React from "react";

const LandingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="h-screen bg-[#111827] overflow-auto">
      <div className="mx-auto max-w-screen-xl w-full h-full">{children}</div>
    </main>
  );
};

export default LandingLayout;
