import React, { useEffect, useState } from "react";
import BannerSlider from "./Swiper/BannerSlider";
import FeaturedDonations from "./Donation/FeaturedDonations/FeaturedDonations";
import LatestCharityRequests from "./LatestCharity/LatestCharityRequest";
import Divider from "../../components/Divider/Divider";
import ImpactSection from "./ExtraSection/ImpactSection";
import CommunitySection from "./ExtraSection/CommunitySection";
import NewsletterSection from "./ExtraSection/NewsletterSection";
import { FiArrowUp, FiArrowDown } from "react-icons/fi";
import { Helmet } from "react-helmet-async";

const Home = () => {
  const [isAtTop, setIsAtTop] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsAtTop(window.scrollY < 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollClick = () => {
    if (isAtTop) {
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div>
      <Helmet>
        <title> Home || FoodCycle</title>
      </Helmet>
      <BannerSlider />
      <Divider />
      <FeaturedDonations />
      <Divider />
      <LatestCharityRequests />
      <Divider />
      <ImpactSection />
      <Divider />
      <CommunitySection />
      <Divider />
      <NewsletterSection />
      <Divider />
      <button
        onClick={handleScrollClick}
        className="fixed bottom-5 cursor-pointer right-5 z-50 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 animate-bounce"
        aria-label={isAtTop ? "Scroll to bottom" : "Scroll to top"}
      >
        {isAtTop ? <FiArrowDown size={20} /> : <FiArrowUp size={20} />}
      </button>
    </div>
  );
};

export default Home;
