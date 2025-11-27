import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../api/cliente";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [username, setUsername] = useState(null);
    const [loading, setLoading] = useState(true);

    // Leer token almacenado al iniciar
    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        const storedUser = localStorage.getItem("username");
        if (storedToken) {
        setToken(storedToken);
        setUsername(storedUser);
        }
        setLoading(false);
    }, []);

    const login = async (username, password) => {
        // llama a /api/auth/login del backend
        const { token } = await api.post("/auth/login", { username, password });

        console.log('token:', token)

        setToken(token);
        setUsername(username);
        localStorage.setItem("token", token);
        localStorage.setItem("username", username);
    };

    const logout = () => {
        setToken(null);
        setUsername(null);
        localStorage.removeItem("token");
        localStorage.removeItem("username");
    };

    const value = {
        token,
        username,
        isAuthenticated: !!token,
        login,
        logout,
        loading,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);