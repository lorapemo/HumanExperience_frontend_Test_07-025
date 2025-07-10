import { createSlice } from '@reduxjs/toolkit';

const taskSlice = createSlice({
    name: 'task',
    initialState: {tasks:null},
    reducers: {
        setTasks: (state, action) => {
            state.tasks = action.payload
        },
        removeTask: (state, action) => {
            return state.filter(task => task.id !== action.payload);
        }
    }
});

export const { setTasks, removeTask } = taskSlice.actions;
export default taskSlice.reducer;