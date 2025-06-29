import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Role, FormRole } from "../../types";
import {
  getRoles,
  createRole,
  updateRole,
  getPermissions,
} from "../../api/roles";
import Spinner from "../common/Spinner";

const RoleForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [permissions, setPermissions] = useState<any[]>([]);

  const [formData, setFormData] = useState<Partial<FormRole>>({
    name: "",
    permissions: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const permissionsData = await getPermissions();
        setPermissions(permissionsData);

        if (id) {
          const roles = await getRoles();
          const role = roles.find((r) => r._id === id);
          if (role) {
            setFormData({
              name: role.name,
              permissions: role.permissions.map((p) => p._id),
            });
          }
        }
      } catch (err) {
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePermissionChange = (permissionId: string) => {
    setFormData((prev) => {
      const currentPermissions = prev.permissions || [];
      if (currentPermissions.includes(permissionId)) {
        return {
          ...prev,
          permissions: currentPermissions.filter((id) => id !== permissionId),
        };
      } else {
        return { ...prev, permissions: [...currentPermissions, permissionId] };
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      if (id) {
        await updateRole(id, formData);
      } else {
        await createRole(formData as FormRole);
      }
      navigate("/roles");
    } catch (err) {
      setError(id ? "Failed to update role" : "Failed to create role");
    }
  };

  if (loading) return <Spinner />;

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-6">
        {id ? "Edit Role" : "Create Role"}
      </h2>
      {error && (
        <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">{error}</div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name || ""}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Permissions</label>
          <div className="space-y-2">
            {permissions.map((permission) => (
              <div key={permission._id} className="flex items-center">
                <input
                  type="checkbox"
                  id={`permission-${permission._id}`}
                  checked={
                    formData.permissions?.includes(permission._id) || false
                  }
                  onChange={() => handlePermissionChange(permission._id)}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label
                  htmlFor={`permission-${permission._id}`}
                  className="ml-2 block text-gray-700"
                >
                  {permission.name}
                </label>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate("/roles")}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            {id ? "Update" : "Create"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RoleForm;
