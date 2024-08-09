import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/context/auth-context";
import { Link, Navigate } from "react-router-dom";

function RootPage() {
  const { currentUser } = useAuth();

  return (
    <>
      {currentUser ? (
        <Navigate to={`/dashboard`} />
      ) : (
        <div className="flex justify-center items-center w-full h-screen">
          <Card className="w-full max-w-sm">
            <CardHeader>
              <CardTitle className="text-2xl">Hello!</CardTitle>
              <CardDescription>Choose your Login option.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <Link to={`/sign-in`}>
                <Button className="w-full">Student</Button>
              </Link>
              <Link to={`/sign-in`}>
                <Button className="w-full">Staff</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}

export default RootPage;
