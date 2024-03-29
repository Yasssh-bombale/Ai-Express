import { UserButton } from "@clerk/nextjs";

const DashboardPage = () => {
  return (
    <>
      <p>welcome to dashboard page (Protected)</p>
      <UserButton afterSignOutUrl="/" />
    </>
  );
};

export default DashboardPage;
