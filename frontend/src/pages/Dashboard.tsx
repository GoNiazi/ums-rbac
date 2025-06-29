import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">
          Welcome, {user?.username}!
        </h2>
        <p className="text-gray-600">
          You have access to the following roles:{" "}
          {user?.roles?.length && user?.roles.map((r) => r.name).join(", ")}
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
