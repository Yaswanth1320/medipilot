import Header from "@/components/pages/Header";
import React from "react";

const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="bg-black">
      <Header />
      <div className="px-10 md:px-20 lg:px-40">{children}</div>
    </div>
  );
};

export default DashboardLayout;
