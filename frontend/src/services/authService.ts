import axios, { AxiosError } from 'axios';

interface User {
    id: string;
    username: string;
    roles: any[];
}

export const login = async (username: string, password: string): Promise<{ token: string; user: User }> => {
    try {
        const response = await axios.post<{ token: string; user: User }>('http://localhost:5000/api/auth/login', {
            username,
            password,
        });
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        return response.data;
    } catch (error) {
        const err = error as AxiosError<{ message: string }>;
        throw new Error(err.response?.data?.message || 'Login failed');
    }
};

export const register = async (username: string, email: string, password: string): Promise<void> => {
    try {
        await axios.post('http://localhost:5000/api/auth/register', { username, email, password });
    } catch (error) {
        const err = error as AxiosError<{ message: string }>;
        throw new Error(err.response?.data?.message || 'Registration failed');
    }
};