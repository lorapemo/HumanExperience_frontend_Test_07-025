import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../controller/authSlice'
import taskReducer from '../controller/taskSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        task: taskReducer,
    }
});