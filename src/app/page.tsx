"use client"

import { useState, useEffect } from 'react';
import { Input, Button, Card } from 'antd';
import { useRouter } from 'next/navigation';
import { useGlobalContext } from './context/GlobalContext';

export default function Home() {
  const [name, setName] = useState<string>('');

  const router = useRouter();
  const { userName, setUserName } = useGlobalContext();


  useEffect(() => {

    if (userName) {
      setName(userName);
      router.push('/game');
    }
  }, [router, userName]);

  const handleStart = () => {
    if (name.trim()) {
      setUserName(name);
      router.push('/game');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 dark:bg-gray-900">
      <Card
        title="Enter your name to start"
        className="w-full max-w-sm p-8 bg-white dark:bg-gray-800 text-black dark:text-white dark:border-gray-700"
        styles={{ header: { color: "inherit" } }}
      >
        <Input
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mb-4 p-2 bg-white dark:bg-gray-700 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 hover:border-black focus:border-black dark:hover:border-gray-600 dark:focus:border-gray-600 dark:border-gray-700"
        />
        <div className="flex justify-end mt-4">
          <Button
            type="primary"
            onClick={handleStart}
            disabled={!name.trim()}
            className="bg-black hover:bg-cyan-100 text-black dark:text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:text-black dark:disabled:text-white "
          >
            Start Game
          </Button>
        </div>
      </Card>
    </div>
  );
}
