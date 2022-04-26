import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe('pk_test_51Kpnq6JmlJsO1FghhmfVHTrBjRtusmHHRlpxnxB9qrfYytcOTiyXaWP9y0BwHCRIqB15BV94yETiN677dhvwcpXE00FL3CpyUK');

const Payment = () => {
    const { appointmentId } = useParams();
    //console.log(appointmentId)
    const [appointment, setAppointment] = useState({});
    useEffect(() => {
        fetch(`https://doctors-portal-shs.herokuapp.com/appointment/${appointmentId}`)
            .then(res => res.json())
            .then(data => setAppointment(data));
    }, [appointmentId])
    return (
        <div>
            <h2>Patient Name: {appointment.patientName} </h2>
            <h3> Pay For {appointment.serviceName} </h3>
            <h3> Appointment Date {appointment.date} </h3>
            <h3> Cost {appointment.price} taka </h3>
            {
                appointment?.price
                &&
                <Elements stripe={stripePromise}>
                    <CheckoutForm appointment={appointment} />
                </Elements>
            }

        </div>
    );
};

export default Payment;

/*
1. install stripe and stripe-react
2. set publishable keys
3. Elements
4. Checkout Form
-----
5. Create payment method
6. server: create payment Intent api
7. Load client secret
8. ConfirmCard payment
9. handle user error
*/