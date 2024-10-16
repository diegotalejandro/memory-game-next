"use client"

import { Card, Button, Typography } from 'antd';
import Image from 'next/image';
import { QuestionCircleFilled } from '@ant-design/icons';
import ReactConfetti from 'react-confetti';
import useGame from './useGame';

export default function Game() {
    const {
        userName,
        cards,
        matches,
        errors,
        screenDimensions,
        handleCardClick,
        resetGame,
        showCardImage,
        checkWin
    } = useGame();

    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-100 dark:bg-gray-900">
            <div className='w-full mb-4 mt-4 flex justify-center'>
                <Card className=" w-80 p-4 flex flex-col justify-center items-center bg-white dark:bg-gray-800 rounded-lg shadow-sm dark:border-gray-700">
                    <h2 className="flex justify-center text-3xl font-bold text-slate-900 dark:text-slate-100">{userName}</h2>
                    <hr className="my-4 border-gray-300 dark:border-gray-700" />
                    {userName && <p className=" mb-4 flex flex-wrap justify-center">
                        <Typography className="mr-2 text-3xl text-slate-900 dark:text-slate-100">✅: {matches}</Typography>
                        <Typography className='text-3xl text-slate-900 dark:text-slate-100'>❌: {errors}</Typography>
                    </p>}
                </Card>
            </div>
            <div className="w-auto grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 2xl:grid-cols-10 gap-4 place-items-center">
                {cards.map((card, index) => (
                    <Card
                        key={index}
                        className="w-32 h-32 cursor-pointer bg-white dark:bg-gray-800 flex justify-center items-center shadow-sm dark:border-gray-700"
                        onClick={() => handleCardClick(index)}
                    >
                        {(showCardImage(index)) ? (
                            <Image
                                style={{ objectFit: 'cover', borderRadius: '8px' }}
                                src={card.url}
                                title={card.title}
                                alt={card.title}
                                priority
                                sizes='150px'
                                layout="fill"
                            />
                        ) : (
                            <div className='text-2xl'>
                                <QuestionCircleFilled className='text-cyan-600 dark:text-gray-100' />
                            </div>
                        )}
                    </Card>
                ))}
            </div>
            <Button type="primary" onClick={resetGame} className="mt-4">
                Restart Game
            </Button>
            {checkWin() && (
                <ReactConfetti
                    width={screenDimensions.width}
                    height={screenDimensions.height}
                />
            )}

        </div>
    );
}
