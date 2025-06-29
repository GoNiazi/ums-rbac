import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { User, FormUser, Role } from "../../types";
import { getUsers, createUser, updateUser } from "../../api/users";
import { getRoles } from "../../api/roles";
import Spinner from "../common/Spinner";

const UserForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [roles, setRoles] = useState<Role[]>([]);

  const [formData, setFormData] = useState<Partial<FormUser>>({
    username: "",
    email: "",
    password: "",
    roles: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const rolesData = await getRoles();
        setRoles(rolesData);

        if (id) {
          const users: User[] = await getUsers();
          const user = users.find((u) => u._id === id);
          if (user) {
            setFormData({
              username: user.username,
              email: user.email,
              roles: user.roles.map((r) => r._id),
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

  const handleRoleChange = (roleId: string) => {
    setFormData((prev) => {
      const currentRoles = prev.roles || [];
      if (currentRoles.includes(roleId)) {
        return { ...prev, roles: currentRoles.filter((id) => id !== roleId) };
      } else {
        return { ...prev, roles: [...currentRoles, roleId] };
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      if (id) {
        await updateUser(id, formData as FormUser);
      } else {
        await createUser(formData as FormUser);
      }
      navigate("/users");
    } catch (err) {
      setError(id ? "Failed to update user" : "Failed to create user");
    }
  };

  if (loading) return <Spinner />;

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-6">
        {id ? "Edit User" : "Create User"}
      </h2>
      {error && (
        <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">{error}</div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="username">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username || ""}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email || ""}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        {!id && (
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
        )}
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Roles</label>
          <div className="space-y-2">
            {roles.map((role) => (
              <div key={role._id} className="flex items-center">
                <input
                  type="checkbox"
                  id={`role-${role._id}`}
                  checked={formData.roles?.includes(role._id) || false}
                  onChange={() => handleRoleChange(role._id)}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label
                  htmlFor={`role-${role._id}`}
                  className="ml-2 block text-gray-700"
                >
                  {role.name}
                </label>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate("/users")}
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

export default UserForm;
