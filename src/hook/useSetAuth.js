import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setIsAuth, setJWToken, setUserId } from "../controller/authSlice";
import { jwtDecode } from 'jwt-decode'; 

export const useSetAuth = () => {
    const dispatch = useDispatch()
    const authToken = useSelector((state) => state.auth.authToken)    

    useEffect(() => {
        const token = authToken || null;

        try {
            const decoded = jwtDecode(token);
            const isExpired = decoded.exp * 1000 < Date.now();

            if (isExpired) {
                dispatch(setJWToken(null))
                localStorage.removeItem('jwtToken');
                dispatch(setUserId(null))
            } else{
                dispatch(setJWToken(token))
                localStorage.setItem('jwtToken', token);
                dispatch(setUserId(decoded.id))
            }
            dispatch(setIsAuth(!isExpired))

        } catch (error) {
            dispatch(setJWToken(null));
            dispatch(setIsAuth(false));
            dispatch(setUserId(null))
            localStorage.removeItem('jwtToken');
        }
    }, [authToken])
}