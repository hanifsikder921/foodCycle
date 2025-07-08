import React from 'react';
import LatestCharityCard from './LatestCharityCard';

const latestRequests = [
    {
        charityName: 'Hope Foundation',
        charityImage: 'https://i.ibb.co/DgRsm3Hb/passport.jpg',
        donationTitle: 'Fresh Bread Donation',
        description: 'We would love to receive the bread for our evening food drive. It will help feed 50 people tonight.'
    },
    {
        charityName: 'FoodForAll',
        charityImage: 'https://i.ibb.co/DgRsm3Hb/passport.jpg',
        donationTitle: 'Organic Veggies',
        description: 'These vegetables are perfect for our community kitchen. Thank you for donating!'
    },
    {
        charityName: 'ServeSmile',
        charityImage: 'https://i.ibb.co/DgRsm3Hb/passport.jpg',
        donationTitle: 'Cooked Meals',
        description: 'Cooked meals are essential for our homeless shelter this weekend.'
    }
];

const LatestCharity = () => {
    return (
        <section className="my-12 px-4 md:px-8 lg:px-16">
            <h2 className="text-3xl font-bold text-center mb-8">Latest Charity Requests</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {latestRequests.map((request, index) => (
                    <LatestCharityCard key={index} request={request} />
                ))}
            </div>
        </section>
    );
};

export default LatestCharity;
