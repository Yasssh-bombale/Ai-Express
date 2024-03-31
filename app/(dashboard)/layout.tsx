import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen relative">
      {/* sidebar */}
      <div className="hidden h-full md:w-72 md:flex md:flex-col md:fixed md:inset-y-0 z-[80] bg-gray-900 text-white">
        <Sidebar />
      </div>

      {/* main */}
      <main className="md:pl-72">
        <Navbar />
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
