import { UserButton } from "@clerk/nextjs";
import Mobilesidebar from "./Mobile-sidebar";

const Navbar = () => {
  return (
    <div className="flex items-center p-4">
      <Mobilesidebar />
      <div className="flex w-full justify-end">
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
};

export default Navbar;
