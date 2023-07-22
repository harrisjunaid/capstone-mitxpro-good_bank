import { useState, useEffect } from 'react';
import {
    getUser,
    addAuthListener
} from './firebaseAuth';

export const useAuth = () => {
    const [authInfo, setAuthInfo] = useState(() => {
        const userObj = getUser();
        const isLoading = !userObj; //isLoading to be true if there's no current user object
        return { isLoading, userObj }; 
    });
    
    useEffect(() => { // subscribed to auth related changes in our application
        const unsubscribe = addAuthListener(user => {
            setAuthInfo({ isLoading: false, user });
        });
        return unsubscribe; // return this unsubscribe function, return unsubscribe, which basically means that React will automatically call this function when the hook unmounts. And that's just a little detail of how to useEffect hook works
    }, []); 

    return authInfo;
}