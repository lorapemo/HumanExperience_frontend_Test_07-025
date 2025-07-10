import axios from 'axios';
import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setJWToken } from "../controller/authSlice";
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const postLogin = useCallback(async (credentials) => {
        try {
            setLoading(true);
            setError(null);
            const response = await axios.post('http://localhost:3000/auth/login', credentials);
            dispatch(setJWToken(response.data.token));
            return response.data;
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message;
            setError(errorMessage);
            throw error;
        } finally {
            setLoading(false);
        }
    }, [dispatch]);

    const postRegister = useCallback(async (userData) => {
        try {
            setLoading(true);
            setError(null);
            const response = await axios.post('http://localhost:3000/auth/register', userData);
            return response.data;
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message;
            setError(errorMessage);
            throw error;
        } finally {
            setLoading(false);
        }
    }, []);

    return { postLogin, postRegister, loading, error };
};