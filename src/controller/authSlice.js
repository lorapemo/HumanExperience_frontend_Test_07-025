import {createSlice} from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuth: false,
        authToken: null,
        userId: null
    },
    reducers: {
        setIsAuth: (state, action) => {
            state.isAuth = action.payload
        },
        setJWToken: (state, action) =>{
            state.authToken = action.payload
        },
        setUserId: (state, action) =>{
            state.userId = action.payload
        }
    }
});


export const { setIsAuth, setJWToken, setUserId } = authSlice.actions;
export default authSlice.reducer;