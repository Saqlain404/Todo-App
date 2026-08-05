import React, {createContext, useContext, useState, useEffect} from 'react';
import * as authApi from '../api/auth';

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        authApi
        .getMe()
        .then(setUser)
        .catch(() => setUser(null))
        .finally(() => setLoading(false));
    }, [])

    const login = async (email, password) => {
        const user = await authApi.login({email, password});
        setUser(user);
        return user;
    }

    const signup = async (name, email, password) => {
        const user = await authApi.signup({name, email, password});
        setUser(user);
        return user;
    }

    const logout = async () => {
        await authApi.logout();
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{user, loading, login, signup, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context; 
}
