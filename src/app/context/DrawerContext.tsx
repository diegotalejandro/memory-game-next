"use client"

import { createContext, useState, useContext, ReactNode } from 'react';
import { IDrawerContextProps } from '../types/types';

const DrawerContext = createContext<IDrawerContextProps | undefined>(undefined);

export const DrawerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDrawer = () => {
        setIsOpen(!isOpen);
    };

    return (
        <DrawerContext.Provider value={{ isOpen, toggleDrawer }}>
            {children}
        </DrawerContext.Provider>
    );
};

export const useDrawer = (): IDrawerContextProps => {
    const context = useContext(DrawerContext);
    if (!context) {
        throw new Error('useDrawer must be used within a DrawerProvider');
    }
    return context;
};