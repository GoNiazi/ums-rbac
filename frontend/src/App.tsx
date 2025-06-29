import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/common/Layout";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Users from "./pages/Users";
import UserForm from "./components/users/UserForm";
import Roles from "./pages/Roles";
import RoleForm from "./components/roles/RoleForm";
import Permissions from "./pages/Permission";
import { AuthProvider } from "./context/AuthContext";
import { SocketProvider } from "./context/SocketContext";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <SocketProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<Layout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/users" element={<Users />} />
              <Route path="/users/new" element={<UserForm />} />
              <Route path="/users/:id/edit" element={<UserForm />} />
              <Route path="/roles" element={<Roles />} />
              <Route path="/roles/new" element={<RoleForm />} />
              <Route path="/roles/:id/edit" element={<RoleForm />} />
              <Route path="/permissions" element={<Permissions />} />
              <Route index element={<Dashboard />} />
            </Route>
          </Routes>
        </SocketProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
