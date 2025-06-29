import RoleList from "../components/roles/RoleList";
import ProtectedRoute from "../components/common/ProtectedRoute";

const RolesPage = () => {
  return (
    <ProtectedRoute requiredPermission="view_roles">
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Role Management</h1>
        <RoleList />
      </div>
    </ProtectedRoute>
  );
};

export default RolesPage;
