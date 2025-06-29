import { useEffect, useState } from "react";
import { Permission } from "../../types";
import { getPermissions, createPermission } from "../../api/roles";
import Spinner from "../common/Spinner";
import { useAuth } from "../../context/AuthContext";

const PermissionList = () => {
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [newPermission, setNewPermission] = useState("");
  const { hasPermission } = useAuth();

  useEffect(() => {
    const fetchPermissions = async () => {
      try {
        const data = await getPermissions();
        setPermissions(data);
      } catch (err) {
        setError("Failed to fetch permissions");
      } finally {
        setLoading(false);
      }
    };

    fetchPermissions();
  }, []);

  const handleCreatePermission = async () => {
    if (!newPermission.trim()) return;

    try {
      const permission = await createPermission({ name: newPermission });
      setPermissions([...permissions, permission]);
      setNewPermission("");
    } catch (err) {
      setError("Failed to create permission");
    }
  };

  if (loading) return <Spinner />;
  if (error)
    return <div className="text-red-500 text-center mt-4">{error}</div>;

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-4 bg-gray-50 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800">Permissions</h2>
      </div>
      <div className="p-4">
        {hasPermission("create_permission") && (
          <div className="mb-6 flex">
            <input
              type="text"
              value={newPermission}
              onChange={(e) => setNewPermission(e.target.value)}
              placeholder="New permission name"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              onClick={handleCreatePermission}
              className="px-4 py-2 bg-indigo-600 text-white rounded-r-md hover:bg-indigo-700"
            >
              Add
            </button>
          </div>
        )}
        <div className="space-y-2">
          {permissions.map((permission) => (
            <div key={permission._id} className="p-3 bg-gray-50 rounded-md">
              <div className="font-medium text-gray-800">{permission.name}</div>
              {permission.description && (
                <div className="text-sm text-gray-600 mt-1">
                  {permission.description}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PermissionList;
