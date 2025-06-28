import React from 'react';
import { createRoot } from 'react-dom/client';
import { AuthProvider } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import UserPage from './pages/UserPage';
import RolePage from './pages/RolePage';

const App: React.FC = () => {
    return (
        <AuthProvider>
            <div className="container mx-auto p-4">
                <LoginPage />
                <UserPage />
                <RolePage />
            </div>
        </AuthProvider>
    );
};

const root = createRoot(document.getElementById('root')!);
root.render(<App />);