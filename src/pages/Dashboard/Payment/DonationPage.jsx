import React, { useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from './PaymentForm';


const stripePromise = loadStripe(import.meta.env.VITE_payment_key);

const DonationPage = () => {
    const [paymentCompleted, setPaymentCompleted] = useState(false);

    const handlePaymentSuccess = (paymentIntent) => {
        console.log('Payment succeeded:', paymentIntent);
        setPaymentCompleted(true);
        // You can redirect or show a success message here
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-6">
                <h1 className="text-2xl font-bold text-center mb-6">Support FoodCycle</h1>
                <p className="text-center mb-8">
                    Your $25 donation helps us reduce food waste and feed those in need.
                </p>
                
                {paymentCompleted ? (
                    <div className="text-center p-6 bg-green-50 rounded-lg">
                        <svg className="mx-auto h-12 w-12 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <h2 className="mt-3 text-lg font-medium text-green-800">Thank you for your donation!</h2>
                        <p className="mt-2 text-sm text-green-600">
                            Your payment was successful. A receipt has been sent to your email.
                        </p>
                    </div>
                ) : (
                    <Elements stripe={stripePromise}>
                        <PaymentForm
                            amount={25} 
                            onPaymentSuccess={handlePaymentSuccess} 
                        />
                    </Elements>
                )}
            </div>
        </div>
    );
};

export default DonationPage;