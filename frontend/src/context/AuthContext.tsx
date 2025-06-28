import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { Socket } from 'socket.io-client';
import io from 'socket.io-client';

interface User {
    id: string;
    username: string;
    roles: any[];
}

interface AuthContextType {
    user: User | null;
    setUser: (user: User | null) => void;
    socket: Socket;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const socket: Socket = io('http://localhost:5000');

    useEffect(() => {
        // Check for existing token on mount
        const token = localStorage.getItem('token');
        if (token) {
            // Optionally fetch user data to validate token
            setUser(JSON.parse(localStorage.getItem('user') || '{}'));
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser, socket }}>
            {children}
        </AuthContext.Provider>
    );
};