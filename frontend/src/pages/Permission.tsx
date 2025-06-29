import PermissionList from "../components/permission/PermissionList";
import ProtectedRoute from "../components/common/ProtectedRoute";

const PermissionsPage = () => {
  return (
    <ProtectedRoute requiredPermission="view_permissions">
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Permission Management</h1>
        <PermissionList />
      </div>
    </ProtectedRoute>
  );
};

export default PermissionsPage;
