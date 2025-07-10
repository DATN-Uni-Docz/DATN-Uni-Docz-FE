import React, { useRef } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ChevronLeftIcon, ChevronRightIcon } from '../../icon/Icon';
import classes from './Banner.module.css';

const Banner = ({ banners }) => {
    const sliderRef = useRef(null);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };

    return (
        <div className={classes.bannerContainer} style={{ position: "relative", width: "100%", margin: "0 auto", overflow: 'hidden' }}>
            <Slider ref={sliderRef} {...settings}>
                {banners.map((banner, index) => (
                    <div key={index}>
                        <img
                            src={banner}
                            alt={`Banner ${index + 1}`}
                            style={{ width: "100%", height: "400px", objectFit: "cover" }}
                        />
                    </div>
                ))}
            </Slider>
            <button className={classes.btnActionBannerLeft} onClick={() => sliderRef.current.slickPrev()}>
                <ChevronLeftIcon />
            </button>
            <button className={classes.btnActionBannerRight} onClick={() => sliderRef.current.slickNext()}>
                <ChevronRightIcon />
            </button>
        </div>
    );
};

export default Banner;
