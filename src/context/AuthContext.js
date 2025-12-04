import React, { createContext, useContext, useState, useEffect } from "react";
import { login as loginService } from "../api/authService";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [username, setUsername] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);

    // Leer token almacenado al iniciar
    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        const storedUser = localStorage.getItem("username");
        const storedRole = localStorage.getItem("role");
        
        if (storedToken) {
            setToken(storedToken);
            setUsername(storedUser);
            setIsAdmin(storedRole === "ADMIN" || storedRole === "admin");
        }
        
        setLoading(false);
    }, []);

    const login = async (username, password) => {
        // Llamar al servicio de autenticación
        const token = await loginService(username, password);

        console.log('token:', token)

        // Por ahora asignamos role basado en el username
        const userRole = username === "admin" ? "ADMIN" : "USER";
        const adminStatus = userRole === "ADMIN";
        
        setToken(token);
        setUsername(username);
        setIsAdmin(adminStatus);
        localStorage.setItem("token", token);
        localStorage.setItem("username", username);
        localStorage.setItem("role", userRole);
    };

    const logout = () => {
        setToken(null);
        setUsername(null);
        setIsAdmin(false);
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        localStorage.removeItem("role");
    };

    const value = {
        token,
        username,
        isAdmin,
        isAuthenticated: !!token,
        login,
        logout,
        loading,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);