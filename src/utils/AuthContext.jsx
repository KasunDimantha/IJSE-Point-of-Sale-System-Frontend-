import { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext({
    isAuthenticated: false,
    jwtToken: null,
    user: null,
    login: () => {},
    logout: () => {},
});

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [jwtToken, setJwtToken] = useState(null);
    const [user, setUser] = useState(null);

    const login = (token) => {
        setIsAuthenticated(true);
        setJwtToken(token);
        localStorage.setItem('token', token);
    }

    const logout = () => {
        isAuthenticated(false);
        setJwtToken(null);
        localStorage.removeItem('token');
    }

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true);
            setJwtToken(token);
        }
    }, [])

    return (
        <AuthContext.Provider value={{ isAuthenticated, jwtToken, user, login, logout }}>   
            {children}
        </AuthContext.Provider>
    )
}
    export const useAuth = () => {
        return useContext(AuthContext);
    }