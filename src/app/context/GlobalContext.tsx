"use client"

import { createContext, useState, useContext, ReactNode, useEffect } from 'react';

interface GlobalContextProps {
    loading: boolean;
    userName: string;
    screenDimensions: {
        width: number;
        height: number;
    };
    setLoading: (loading: boolean) => void;
    setUserName: (userName: string) => void;
}

const GlobalContext = createContext<GlobalContextProps | undefined>(undefined);

export const GlobalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [userName, setUserName] = useState<string>('');
    const [screenDimensions, setScreenDimensions] = useState({ width: 0, height: 0 });

    const getStoredUserName = () => {
        const storedUserName = window.localStorage.getItem('userName');
        if (storedUserName) {
            setUserName(storedUserName);
        }
    }

    const getScreenDimensions = () => {
        setScreenDimensions({
            width: window.innerWidth,
            height: window.innerHeight
        });
    }

    useEffect(() => {
        if (window !== undefined) {
            getStoredUserName();
            getScreenDimensions();
        }

        const handleResize = () => {
            setScreenDimensions({
                width: window.innerWidth,
                height: window.innerHeight
            });
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        if (typeof userName === "string" && window !== undefined) {
            window.localStorage.setItem('userName', userName);
        }
    }, [userName]);

    return (
        <GlobalContext.Provider value={{
            // Variables
            loading,
            userName,
            screenDimensions,
            // Methods
            setLoading,
            setUserName
        }}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = (): GlobalContextProps => {
    const context = useContext(GlobalContext);
    if (!context) {
        throw new Error('useGlobalContext must be used within a GlobalProvider');
    }
    return context;
};