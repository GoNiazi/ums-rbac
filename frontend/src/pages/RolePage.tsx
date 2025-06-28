import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { fetchRoles, createRole } from '../services/roleService';

interface Role {
    _id: string;
    name: string;
    permissions: { name: string }[];
}

const RolePage: React.FC = () => {
    const authContext = useContext(AuthContext);
    const [roles, setRoles] = useState<Role[]>([]);
    const [newRole, setNewRole] = useState<string>('');
    const [error, setError] = useState<string>('');

    if (!authContext) {
        throw new Error('RolePage must be used within an AuthProvider');
    }

    const { user, socket } = authContext;

    useEffect(() => {
        const loadRoles = async () => {
            try {
                const fetchedRoles = await fetchRoles();
                setRoles(fetchedRoles);
                setError('');
            } catch (err: any) {
                setError(err.message);
            }
        };
        if (user) loadRoles();

        socket.on('roleUpdated', (data: Role) => {
            setRoles(prev => [...prev, data]);
        });

        return () => {
            socket.off('roleUpdated');
        };
    }, [user, socket]);

    const handleCreateRole = async () => {
        try {
            const role = await createRole(newRole);
            socket.emit('roleUpdate', role);
            setNewRole('');
            setError('');
        } catch (err: any) {
            setError(err.message);
        }
    };

    if (!user) return null;

    return (
        <div className="mt-6">
            <h2 className="text-xl font-bold mb-4">Roles</h2>
            {error && <p className="text-red-500">{error}</p>}
            <div className="mb-4">
                <input
                    type="text"
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value)}
                    placeholder="New role name"
                    className="p-2 border rounded mr-2"
                />
                <button
                    onClick={handleCreateRole}
                    className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
                >
                    Create Role
                </button>
            </div>
            <div className="grid grid-cols-1 gap-4">
                {roles.map(role => (
                    <div key={role._id} className="p-4 border rounded">
                        <p>Name: {role.name}</p>
                        <p>Permissions: {role.permissions.map(p => p.name).join(', ')}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RolePage;