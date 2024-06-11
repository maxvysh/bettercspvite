import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";

// function navigate(url) {
//   window.location.href = url;
// }

// async function auth() {
//   const response = await fetch("http://127.0.0.1:3000/request", {
//     method: "POST",
//   });
//   const data = await response.json();
//   navigate(data.url);
// }




const CreateAccount = () => {
  const handleLogin = async () => {
    try {
      const response = await fetch("http://127.0.0.1:3000/request", {
        method: "POST",
      });
      const data = await response.json();
      console.log(data);
      window.location.href = data.url;
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Create an account</CardTitle>
        <CardDescription>
          Enter your email below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid grid-cols-1 gap-6">
          <Button variant="outline" onClick={handleLogin}>
            <Icons.google className="mr-2 h-4 w-4" />
            Google
          </Button>
        </div>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="m@example.com" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" />
        </div>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          onClick={() => alert("Please select campus and semester options.")}
        >
          Create account
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CreateAccount;
