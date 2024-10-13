import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";

export const HomePage = () => {
  const router = useRouter();

  return (
    <div className="flex justify-between items-center">
      <h1 className="text-lg">My Jobs Radar</h1>
      <div className="flex gap-2">
        <Button variant="bordered" onClick={() => router.push("/signup")}>
          Sign up
        </Button>
        <Button onClick={() => router.push("/login")}>Login</Button>
      </div>
    </div>
  );
};
