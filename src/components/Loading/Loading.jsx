import React from 'react';
import { FadeLoader } from 'react-spinners';

const Loading = () => {
    return (
        <div className='w-full min-h-screen flex items-center justify-center bg-base-300 dark:bg-gray-800'>

            <FadeLoader color="#00dea9" />

        </div>
    );
};

export default Loading;