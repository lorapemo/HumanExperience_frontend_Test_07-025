import axios from "axios";
import { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTasks } from "../controller/taskSlice";

export const useGetTask = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const dispatch = useDispatch();
    const userId = useSelector((state) => state.auth.userId);
    const tasks = useSelector((state) => state.task.tasks);

    const getTask = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await axios.get(`http://localhost:3000/task/${userId}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
                }
            });
            dispatch(setTasks(response.data));
            return response.data;
        } catch (error) {
            setError(error.response?.data?.message || error.message);
            throw error;
        } finally {
            setLoading(false);
        }
    }, [dispatch, userId]);

    const deleteTask = useCallback(async (taskId) => {
        try {
            setLoading(true);
            setError(null);
            const response = await axios.delete(`http://localhost:3000/task/${taskId}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
                }
            });
            getTask()
        } catch (error) {
            setError(error.response?.data?.message || error.message);
            throw error;
        } finally {
            setLoading(false);
        }
    })

    const createTask = useCallback(async (taskData) => {
        try {
            setLoading(true);
            const response = await axios.post(`http://localhost:3000/task`, taskData, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
                }
            });
            getTask();
            return response.data;
        } catch (error) {
            setError(error.response?.data?.message || error.message);
            throw error;
        } finally {
            setLoading(false);
        }
    }, [getTask]);

    const updateTask = useCallback(async (taskId, taskData) => {
    try {
        setLoading(true);
        setError(null);
        const response = await axios.put(`http://localhost:3000/task/${taskId}`, taskData, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
            }
        });
        getTask();
        return response.data;
    } catch (error) {
        setError(error.response?.data?.message || error.message);
        throw error;
    } finally {
        setLoading(false);
    }
}, [getTask]);

    return { getTask, loading, error, tasks, deleteTask, createTask, updateTask };
};