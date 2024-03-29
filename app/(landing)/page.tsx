import { Button } from "@/components/ui/button";
import Link from "next/link";

const LandingPage = () => {
  return (
    <>
      <p>Landing page (Unprotected)</p>
      <Link href={"/sign-in"}>
        <Button>Sign-in</Button>
      </Link>
      <Link href={"/sign-up"}>
        <Button>Sign-up</Button>
      </Link>
    </>
  );
};

export default LandingPage;
