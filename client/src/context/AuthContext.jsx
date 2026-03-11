import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check for existing session/token in localStorage or similar
        const storedUser = localStorage.getItem('eventsphere_user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = async (credentials) => {
        // This is a placeholder for real API call
        setLoading(true);
        try {
            // Mock login logic
            const mockUser = {
                id: '1',
                name: 'Eshwar User',
                email: credentials.email,
                role: 'student'
            };
            setUser(mockUser);
            localStorage.setItem('eventsphere_user', JSON.stringify(mockUser));
            return { success: true };
        } catch (error) {
            return { success: false, error: 'Identity verification failed.' };
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('eventsphere_user');
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
