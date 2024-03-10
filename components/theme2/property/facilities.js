"use client"
import { useSearchParams } from 'next/navigation';
import React from 'react';

const data = [
    {
        id: 1,
        title: 'Area',
        value: '420 m2',
        icon: '/area.png',
    },
    {
        id: 2,
        title: 'Unit',
        value: '20 Units',
        icon: '/unit.png',
    },
    {
        id: 3,
        title: 'Bedroom',
        value: '6 Bedrooms',
        icon: '/bedroom.png',
    },
    {
        id: 4,
        title: 'Bathroom',
        value: '3 Bathrooms',
        icon: '/bathroom.png',
    },
    {
        id: 5,
        title: 'Garage',
        value: '2 Garages',
        icon: '/garage.png',
    },
    {
        id: 6,
        title: 'Kitchen',
        value: '3 Kitchens',
        icon: '/kitchen.png',
    },
];

const Facilities = ({ singleData }) => {
    const propertyId = useSearchParams().get("_id");


    return (
        <div className='my-14 bg-[#FAFAFF] p-3 md:p-7 rounded-md'>
            <div className={`grid place-content-between place-items-center gap-4 grid-cols-2 md:grid-cols-3 ${propertyId ? 'lg:grid-cols-3' : ' lg:grid-cols-6 '}`}>
                <FacilitiesItem title={"Area"} value={singleData?.area} icon={'/area.png'} />
                <FacilitiesItem title={"Unit"} value={singleData?.unit} icon={'/unit.png'} />
                <FacilitiesItem title={"Bathrooms"} value={singleData?.bathrooms} icon={'/bedroom.png'} />
                <FacilitiesItem title={"bedrooms"} value={singleData?.bedrooms} icon={'/bathroom.png'} />
                <FacilitiesItem title={"garage"} value={singleData?.garage} icon={'/garage.png'} />
                <FacilitiesItem title={"kitchen"} value={singleData?.kitchen} icon={'/kitchen.png'} />
            </div>
        </div>
    );
};

export default Facilities;

const FacilitiesItem = ({ title, value, icon }) => {
    return (
        <div className='h-full w-full rounded-md bg-white transition-shadow delay-100 ease-in-out hover:shadow-xl py-8'>
            <div className='flex h-full  w-full flex-col items-center justify-center'>
                <div className='flex md:h-[42px] h-[34px] w-[42px] md:w-[52px] items-center justify-center'>
                    <img src={icon} alt='' className=' object-contain' />
                </div>
                <p className='md:text-3xl font-libre_baskerville text-base  mb-2 mt-4 text-dark_text capitalize'>{title}</p>
                <p className='paragraph_1 text-secondary_text'>{value} <span className='lowercase'>{title}</span></p>
            </div>
        </div>
    );
};
