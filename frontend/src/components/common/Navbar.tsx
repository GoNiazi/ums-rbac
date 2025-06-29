import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/dashboard" className="text-xl font-bold text-indigo-600">
          RBAC System
        </Link>

        {user && (
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex space-x-6">
              <Link
                to="/dashboard"
                className="text-gray-700 hover:text-indigo-600"
              >
                Dashboard
              </Link>
              <Link to="/users" className="text-gray-700 hover:text-indigo-600">
                Users
              </Link>
              <Link to="/roles" className="text-gray-700 hover:text-indigo-600">
                Roles
              </Link>
              <Link
                to="/permissions"
                className="text-gray-700 hover:text-indigo-600"
              >
                Permissions
              </Link>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-gray-700">{user.username}</span>
              <button
                onClick={handleLogout}
                className="p-1 text-gray-500 hover:text-red-500"
                title="Logout"
              >
                <ArrowRightOnRectangleIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
