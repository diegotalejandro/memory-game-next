"use client"

import React from 'react';
import { Spin } from 'antd';
import { useGlobalContext } from '../context/GlobalContext';

const Loading: React.FC = () => {
    const { loading } = useGlobalContext();

    if (!loading) return null;

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100 dark:bg-gray-900">
            <Spin size="large" />
        </div>
    );
};

export default Loading;