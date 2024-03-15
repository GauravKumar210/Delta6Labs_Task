// Banner.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './styles/Banner.css';

interface BannerData {
    id: number;
    url: string;
    color: string;
    color_dark: string;
    dark_url: string;
    mobile_url: string;
    tab_url: string;
    link: string;
    timestamp: string;
    is_external_link: boolean;
}

const Banner: React.FC = () => {
    const [bannerData, setBannerData] = useState<BannerData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [currentSlide, setCurrentSlide] = useState<number>(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get<{ data: { banners: BannerData[] } }>('https://api-staging.bitdelta.com/api/v1/public/general');
                setBannerData(response.data.data.banners);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: true,
    };

    return (
        <div className='slick-slides'>
            {loading ? (
                <p>Loading Banner Data....</p>
            ) : (
                        <Slider {...sliderSettings} initialSlide={currentSlide}>
                            {bannerData.map((banner, id) => (
                                <div key={id}>
                                    <img src={banner.url} alt={`Banner ${id}`} />
                                </div>
                            ))}
                        </Slider>

            )}
        </div>
    );
};

export default Banner;
