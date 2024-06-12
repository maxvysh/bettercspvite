import CreateAccount from "@/components/CreateAccount";

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
