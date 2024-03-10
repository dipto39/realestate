import React from 'react';

const Video = ({ singleData }) => {
    return (
        <div className='mt-12'>
            <p className='paragraph_1 text-secondary_text'>
                {singleData?.video_description}
            </p>

            <div className='mt-6'>

                {singleData?.video?.endsWith(".mp4") && (
                    <video width="100%" height="600" controls>
                        <source src={singleData?.video} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                )}

                { !singleData?.video?.endsWith(".mp4") && <img src={singleData?.video} />}
            </div>
        </div>
    );
};

export default Video;
