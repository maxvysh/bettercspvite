import {
  Select,
  SelectContent,
  // SelectGroup,
  SelectItem,
  // SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  //   CardDescription,
  CardFooter,
  //   CardHeader,
  //   CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import CreateAccount from "@/components/CreateAccount";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Home() {
  return (
    <div className="h-screen bg-custom-blue">
      <div className="flex items-center justify-center flex-col">
        <h1 className="text-8xl text-white">
          A better course schedule planner for Rutgers
        </h1>
        <CreateAccount />
      </div>
    </div>
  );
}

export default Home;
