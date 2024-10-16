"use client"

import { Card, Drawer, Typography } from 'antd';
import Link from "next/link";
import { useDrawer } from '../context/DrawerContext';
import { useStorage } from '../hooks/useStorage';
import { useRouter } from 'next/navigation';

const DrawerCustom = () => {
    const { isOpen, toggleDrawer } = useDrawer();
    const { getLocalStorage, setLocalStorage } = useStorage();
    const router = useRouter();

    const editName = (name: string) => {
        setLocalStorage('name', '');
        router.replace('/');
        toggleDrawer();
    }

    const existsName = () => {
        const storedName = getLocalStorage('name');
        return !!storedName;

    }

    return (
        <Drawer
            placement="left"
            closeIcon={false}
            onClose={toggleDrawer}
            open={isOpen}
            className="dark:bg-gray-900"
        >
            <Typography.Title level={4} className="dark:text-white">Options</Typography.Title>
            {existsName() && (
            <Card
                className="mt-8 p-2 my-2 w-64 h-14 bg-gray-200 dark:bg-gray-600 rounded cursor-pointer text-center flex justify-center items-center dark:border-gray-700"
                onClick={() => editName('')}
            >
                <Typography.Text className="dark:text-white">Change Name</Typography.Text>
            </Card>
            )}
        </Drawer>
    );
}

export default DrawerCustom;