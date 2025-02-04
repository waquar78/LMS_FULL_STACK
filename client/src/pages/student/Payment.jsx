import React from 'react';
import { useGetCourseByIdQuery } from '@/redux/api/courseApi.js';
import { usePurchaseStatusMutation } from '@/redux/api/coursePurchaseApi.js';

import { useParams } from 'react-router-dom';
import { toast } from 'sonner';

const Payment = () => {
    const params = useParams();
    const courseId = params.courseId;

    // Call the query hooks without conditional logic
    const { data, isSuccess, isError, isLoading } = useGetCourseByIdQuery(courseId);
    const [purchaseStatus, { isSuccess: purchaseSuccessful, error: purchaseError }] = usePurchaseStatusMutation();

    const paymentHandler = async () => {
        try {
            await purchaseStatus({ 
                amount: data?.course?.coursePrice, 
                courseId: courseId, 
                status: 'completed' 
            });
            if (purchaseSuccessful) {
                toast.success('Payment successful!');
            }
        } catch (error) {
            console.error(error);
            toast.error('Payment failed!');
        }
    };

    // Conditional rendering AFTER hooks have been called
    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Something went wrong while fetching the course details.</div>;
    }
    return (
        <div className='p-24 h-screen flex items-center justify-center bg-gray-100'>

            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="bg-white rounded-lg shadow-lg p-8 w-96">
                    <img src="data:image/png;base64,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" alt="logo" />
                    <div className="text-center mb-6">

                        <span className="text-3xl font-bold text-gray-700">PayPal</span>
                    </div>

                    {/* Form */}
                    <form>
                        <div className="mb-4">
                            <label
                                htmlFor="category"
                                className="block text-gray-700 font-medium mb-1"
                            >
                                Category:
                            </label>
                            <input
                                type="category"
                                id="category"
                                defaultValue={data.course.category}
                                placeholder="Enter your email"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                            />
                        </div>

                        <div className="mb-4">
                            <label
                                htmlFor="product"
                                className="block text-gray-700 font-medium mb-1"
                            >
                                Course Id:
                            </label>
                            <input
                                type="text"
                                defaultValue={courseId}

                                id="product"
                                placeholder="Enter product name"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                            />
                        </div>

                        <div className="mb-4">
                            <label
                                htmlFor="amount"
                                className="block text-gray-700 font-medium mb-1"
                            >
                                Amount:
                            </label>
                            <input
                                type="number"
                                defaultValue={data.course.coursePrice}
                                id="amount"
                                placeholder="Enter amount"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                            />
                        </div>

                        <button
                            onClick={paymentHandler}
                            type="submit"
                            className="w-full bg-blue-600 text-white font-bold py-2 rounded-lg hover:bg-blue-700 transition"
                        >
                            Pay
                        </button>
                    </form>
                </div>
            </div>

        </div>
    )
}

export default Payment
