import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { fetchUsers } from '../services/userService';

interface User {
    _id: string;
    username: string;
    email: string;
    roles: { name: string }[];
}

const UserPage: React.FC = () => {
    const authContext = useContext(AuthContext);
    const [users, setUsers] = useState<User[]>([]);
    const [error, setError] = useState<string>('');

    if (!authContext) {
        throw new Error('UserPage must be used within an AuthProvider');
    }

    const { user } = authContext;

    useEffect(() => {
        const loadUsers = async () => {
            try {
                const fetchedUsers = await fetchUsers();
                setUsers(fetchedUsers);
                setError('');
            } catch (err: any) {
                setError(err.message);
            }
        };
        if (user) loadUsers();
    }, [user]);

    if (!user) return null;

    return (
        <div className="mt-6">
            <h2 className="text-xl font-bold mb-4">Users</h2>
            {error && <p className="text-red-500">{error}</p>}
            <div className="grid grid-cols-1 gap-4">
                {users.map(user => (
                    <div key={user._id} className="p-4 border rounded">
                        <p>Username: {user.username}</p>
                        <p>Email: {user.email}</p>
                        <p>Roles: {user.roles.map(role => role.name).join(', ')}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserPage;