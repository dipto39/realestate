import React from 'react';
import { FaAward } from 'react-icons/fa';

// const jsonData = JSON.parse(about?.content || "{}")

// const aboutImage1 = jsonData?.about_us?.about_us_image_1;
//   const aboutImage2 = jsonData?.about_us?.about_us_image_2;

//   const aboutImgUrl = aboutImage1 && aboutImage1[0].url ? aboutImage1[0].url : aboutImage1;
//   const aboutImgUrl2 = aboutImage2 && aboutImage2[0].url ? aboutImage2[0].url : aboutImage2;

const Timeline = ({ jsonData }) => {
    console.log("🚀 ~ Timeline ~ jsonData:", jsonData)
    return (
        <section className='relative py-20'>
            <div className="absolute top-5 left-1 -z-10">
                <img src="./element2.png" alt="" />
            </div>
            <div className="absolute top-15 right-5 -z-10">
                <img src="./ret.png" alt="" />
            </div>
            <div className=" container">
                <div className="lg:flex gap-20 ">
                    <div className="basis-2/5 relative">
                        {jsonData?.sweet_journey?.sweet_journey_image && jsonData?.sweet_journey?.sweet_journey_image[0]?.url ? 
                        <div className="w-full h-full">
                            <img className='w-full' src={jsonData?.sweet_journey?.sweet_journey_image[0]?.url} alt="" />
                           </div>  :
                        <div className="w-full h-full">
                            <img className='w-full' src={jsonData?.sweet_journey?.sweet_journey_image } alt="" />
                        </div>
                        }
                        <div className="p-5 bg-white rounded-full absolute top-16 -right-12 lg:block hidden">
                            <span className='headerr_1 transform rotate-1  text-primary'><FaAward></FaAward></span>
                        </div>
                    </div>
                    <div className="basis-3/5 pt-10 lg:pt-0">
                        <h1 className='header_2'>
                            {jsonData?.sweet_journey?.heading}
                        </h1>
                        <p className='paragraph_1 text-secondary_text py-8'>
                            {jsonData?.sweet_journey?.description}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Timeline;
