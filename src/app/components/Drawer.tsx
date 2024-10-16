"use client"

import { Card, Drawer, Typography } from 'antd';
import { useDrawer } from '../context/DrawerContext';
import { useRouter } from 'next/navigation';
import { useGlobalContext } from '../context/GlobalContext';

const DrawerCustom = () => {
    const { isOpen, toggleDrawer } = useDrawer();
    const router = useRouter();
    const { userName, setUserName } = useGlobalContext();

    const editName = () => {
        setUserName('');
        router.replace('/');
        toggleDrawer();
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
            {!!userName && (
                <Card
                    className="mt-8 p-2 my-2 w-64 h-14 bg-gray-200 dark:bg-gray-600 rounded cursor-pointer text-center flex justify-center items-center dark:border-gray-700"
                    onClick={() => editName()}
                >
                    <Typography.Text className="dark:text-white">Change Name</Typography.Text>
                </Card>
            )}
        </Drawer>
    );
}

export default DrawerCustom;