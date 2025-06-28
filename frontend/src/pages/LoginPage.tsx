import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { login } from '../services/authService';

const LoginPage: React.FC = () => {
    const authContext = useContext(AuthContext);
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');

    if (!authContext) {
        throw new Error('LoginPage must be used within an AuthProvider');
    }

    const { user, setUser } = authContext;

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const { user: loggedInUser } = await login(username, password);
            setUser(loggedInUser);
            setError('');
        } catch (err: any) {
            setError(err.message);
        }
    };

    if (user) return null;

    return (
        <div className="max-w-md mx-auto mt-10">
            <h2 className="text-xl font-bold mb-4">Login</h2>
            {error && <p className="text-red-500">{error}</p>}
            <div className="space-y-4">
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    className="w-full p-2 border rounded"
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="w-full p-2 border rounded"
                />
                <button
                    onClick={handleLogin}
                    className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                >
                    Login
                </button>
            </div>
        </div>
    );
};

export default LoginPage;