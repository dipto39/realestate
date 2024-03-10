"use client";
import { usePathname } from "next/navigation";


const SingleService = ({ item }) => {
    const path = usePathname();
    return (
        <div className={`group relative rounded-lg bg-white transition-all hover:bg-primary hover:text-white ${path !== '/' && 'shadow-[0px_0px_10px_rgba(0,0,0,0.2)]'}`}>
            <div className='absolute right-5 top-4'>
                <img  src='/icons/Vector1.png' alt='' />
            </div>
            <div className='relative'>
                <img className='absolute w-28' src='./con_redious.png' alt='' />
            </div>
            <div className='ms-4 mt-5 flex h-14 w-14 items-center justify-center rounded-full bg-orange-50 text-primary'>
                <img src={item?.icon} />
            </div>
            <div className='p-7'>
                <p className='header_3 pb-4 capitalize'>{item?.name}</p>
                <p className='paragraph_3 text-secondary group-hover:text-white '>
                    {item?.description}
                </p>
            </div>
        </div>
    );
};

export default SingleService;