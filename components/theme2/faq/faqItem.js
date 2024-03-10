import React, { useState } from 'react';
import { FiPlus } from 'react-icons/fi';

const FaqItem = ({ item }) => {
    const [open, setOpen] = useState(false);
    return (
        <>
            <div
                className='flex cursor-pointer items-center justify-between border-t border-secondary_text py-5 text-dark_text transition-all ease-in-out hover:text-primary'
                onClick={() => setOpen(!open)}
            >
                <h4 className={`header_5 ${open && 'text-primary'} `}> {item?.question} </h4>
                <div className="!h-5 !w-5 ">
                    <FiPlus size={18} className={open ? 'rotate-45 transform text-primary ' : ''} />
                </div>
            </div>
            <div className={open ? 'mb-5 text-sm text-gray-600' : 'hidden'}>
                <p className='paragraph_1 text-secondary_text'>{item?.answer}</p>
            </div>
        </>
    );
};

export default FaqItem;
