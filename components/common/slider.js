import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";


import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

import { Navigation, Pagination } from 'swiper/modules';

const Slider = ({ children }) => {
    return (
        <div>

            <Swiper
                modules={[Pagination, Navigation]}
                pagination={{ clickable: true }}
                navigation={{ nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" }}
                className="mySwiper"
            >
                {children}
            </Swiper>

        </div>
    )
}

export default Slider