import axios, { AxiosError } from 'axios';

interface Role {
    _id: string;
    name: string;
    permissions: { name: string }[];
}

export const fetchRoles = async (): Promise<Role[]> => {
    try {
        const response = await axios.get<Role[]>('http://localhost:5000/api/roles', {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        return response.data;
    } catch (error) {
        const err = error as AxiosError<{ message: string }>;
        throw new Error(err.response?.data?.message || 'Failed to fetch roles');
    }
};

export const createRole = async (name: string): Promise<Role> => {
    try {
        const response = await axios.post<Role>(
            'http://localhost:5000/api/roles',
            { name },
            { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
        );
        return response.data;
    } catch (error) {
        const err = error as AxiosError<{ message: string }>;
        throw new Error(err.response?.data?.message || 'Failed to create role');
    }
};