import React from 'react';
import BannerSlider from './Swiper/BannerSlider';
import FeaturedDonations from './Donation/FeaturedDonations/FeaturedDonations';
import LatestCharity from './LatestCharity/LatestCharity';

const Home = () => {
    return (
      <div >
        <BannerSlider/>
        <FeaturedDonations/>
        <LatestCharity/>
        
      </div>
    );
};

export default Home;