import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './checkout.css';

// Компонент для відображення помилок
const ErrorMessages = ({ errors, touched }) => {
    return (
        <div className="error-container">
            {Object.keys(errors).map((key) => (
                touched[key] && <p key={key} className="error-message">{errors[key]}</p>
            ))}
        </div>
    );
};

// Схема валідації
const validationSchema = Yup.object({
    firstName: Yup.string()
        .required('First name is required')
        .max(20, 'First name must be less than 20 characters'),
    lastName: Yup.string()
        .required('Last name is required')
        .max(20, 'Last name must be less than 20 characters'),
    email: Yup.string()
        .email('Email is invalid')
        .required('Email is required'),
    phone: Yup.string()
        .matches(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits')
        .required('Phone number is required'),
    address: Yup.string()
        .required('Address is required'),
    cardNumber: Yup.string()
        .matches(/^\d{16}$/, 'Card number must be 16 digits')
        .required('Card number is required'),
});

const Checkout = () => {
    const navigate = useNavigate();

    const handleSubmit = (values) => {
        console.log('Form data:', values);
        navigate('/success'); // Перехід на Success сторінку
    };

    return (
        <div className="checkout-container">
            <h2>Checkout Page</h2>
            <Formik
                initialValues={{
                    firstName: '',
                    lastName: '',
                    email: '',
                    phone: '',
                    address: '',
                    cardNumber: '',
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ errors, touched }) => (
                    <Form className="checkout-form">
                        <div className="form-group">
                            <label htmlFor="firstName">First Name</label>
                            <Field type="text" id="firstName" name="firstName" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastName">Last Name</label>
                            <Field type="text" id="lastName" name="lastName" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <Field type="email" id="email" name="email" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone">Phone Number</label>
                            <Field type="text" id="phone" name="phone" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="address">Address</label>
                            <Field type="text" id="address" name="address" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="cardNumber">Card Number</label>
                            <Field type="text" id="cardNumber" name="cardNumber" />
                        </div>

                        {/* Відображення всіх помилок */}
                        <ErrorMessages errors={errors} touched={touched} />

                        <button type="submit" className="submit-button">
                            Submit
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default Checkout;
