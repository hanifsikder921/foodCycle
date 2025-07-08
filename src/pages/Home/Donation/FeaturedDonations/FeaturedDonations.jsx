import React from 'react';
import FeaturedDonationsCard from './FeaturedDonationsCard';

const demoDonations = [
    {
        _id: '1',
        image: 'https://i.ibb.co/qM2TSsWK/cute-little-indian-asian-kids-studying-study-table-with-pile-books-educational-globe-isolated-light.jpg',
        title: 'Fresh Bread Donation',
        foodType: 'Bakery',
        restaurantName: 'Golden Oven',
        location: 'Dhaka, Bangladesh',
        status: 'Available'
    },
    {
        _id: '2',
       image: 'https://i.ibb.co/qM2TSsWK/cute-little-indian-asian-kids-studying-study-table-with-pile-books-educational-globe-isolated-light.jpg',
        title: 'Organic Veggies',
        foodType: 'Produce',
        restaurantName: 'Green Leaf',
        location: 'Chittagong',
        status: 'Picked Up'
    },
    {
        _id: '3',
        image: 'https://i.ibb.co/qM2TSsWK/cute-little-indian-asian-kids-studying-study-table-with-pile-books-educational-globe-isolated-light.jpg',
        title: 'Seasonal Fruits',
        foodType: 'Fruits',
        restaurantName: 'Fruit Fiesta',
        location: 'Sylhet',
        status: 'Available'
    },
    {
        _id: '4',
        image: 'https://i.ibb.co/qM2TSsWK/cute-little-indian-asian-kids-studying-study-table-with-pile-books-educational-globe-isolated-light.jpg',
        title: 'Cooked Meals',
        foodType: 'Meals',
        restaurantName: 'Food Corner',
        location: 'Khulna',
        status: 'Available'
    }
];

const FeaturedDonations = () => {
    return (
        <section className="my-12 px-4 md:px-8 lg:px-16">
            <h2 className="text-3xl font-bold text-center mb-8">Featured Donations</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {demoDonations.map(donation => (
                    <FeaturedDonationsCard key={donation._id} donation={donation} />
                ))}
            </div>
        </section>
    );
};

export default FeaturedDonations;
