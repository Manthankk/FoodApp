import React, { useEffect, useContext } from 'react';
import './Verify.css';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { StoreContext } from '../../context/StoreContext';

const Verify = () => {
    const [searchParams] = useSearchParams();
    const success = searchParams.get('success');
    const orderId = searchParams.get('orderId');
    const { url } = useContext(StoreContext);
    const navigate = useNavigate();

    const verifyPayment = async () => {
        try {
            const response = await axios.post(`${url}/api/order/verify`, { success, orderId });
            if (response.data.success) {
                navigate("/myorders");
            } else {
                console.error("Failed to verify payment", response.data.message);
                navigate("/");
            }
        } catch (error) {
            console.error("Error verifying payment", error);
            navigate("/");
        }
    };

    useEffect(() => {
        if (success && orderId) {
            verifyPayment();
        }
    }, [success, orderId]);

    return (
        <div className='verify'>
            <div className="spinner"></div>
        </div>
    );
};

export default Verify;
