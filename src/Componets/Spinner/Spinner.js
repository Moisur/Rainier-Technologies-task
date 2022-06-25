import React from 'react';

const Spinner = () => {
    return (
        <div className="flex items-center justify-center ">
            <div className="w-32 h-32 border-t-4 border-b-4 border-green-900 rounded-full animate-spin"></div>
        </div>
    );
};

export default Spinner;