import UserList from "../components/users/UserList";
import ProtectedRoute from "../components/common/ProtectedRoute";

const UsersPage = () => {
  return (
    <ProtectedRoute requiredPermission="view_users">
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">User Management</h1>
        <UserList />
      </div>
    </ProtectedRoute>
  );
};

export default UsersPage;
