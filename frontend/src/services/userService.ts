import axios, { AxiosError } from 'axios';

interface User {
    _id: string;
    username: string;
    email: string;
    roles: { name: string }[];
}

export const fetchUsers = async (): Promise<User[]> => {
    try {
        const response = await axios.get<User[]>('http://localhost:5000/api/users', {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        return response.data;
    } catch (error) {
        const err = error as AxiosError<{ message: string }>;
        throw new Error(err.response?.data?.message || 'Failed to fetch users');
    }
};