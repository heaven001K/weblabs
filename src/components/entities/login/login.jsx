import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Імпортуємо Link для навігації
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './login.css';

const Login = () => {
    const navigate = useNavigate();
    const [loginError, setLoginError] = useState(""); // Стан для помилки логіну
    const [showPassword, setShowPassword] = useState(false); // Стан для показу пароля

    const validationSchema = Yup.object({
        email: Yup.string()
            .email('Invalid email format')
            .required('Email is required'),
        password: Yup.string()
            .required('Password is required'),
    });

    const handleSubmit = (values) => {
        const storedEmail = localStorage.getItem('userEmail');
        const storedPassword = localStorage.getItem('userPassword'); // Перевіряємо пароль в localStorage

        // Якщо email та пароль співпадають з тим, що в localStorage
        if (values.email === storedEmail && values.password === storedPassword) {
            navigate('/'); // Перенаправляємо на головну сторінку
        } else {
            setLoginError("Invalid email or password. Please try again.");
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(prevState => !prevState); // Перемикаємо видимість пароля
    };

    return (
        <div className="auth-container">
            <h2>Login</h2>
            <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {() => (
                    <Form className="auth-form">
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <Field type="email" id="email" name="email" />
                            <ErrorMessage name="email" component="p" className="error-message" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <div className="password-container">
                                <Field
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    name="password"
                                />
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className="password-toggle-button"
                                >
                                    {showPassword ? "Hide" : "Show"}
                                </button>
                            </div>
                            <ErrorMessage name="password" component="p" className="error-message" />
                        </div>
                        <button type="submit" className="auth-button">Login</button>
                    </Form>
                )}
            </Formik>
            {loginError && <p className="error-message">{loginError}</p>} {/* Виводимо помилку, якщо вона є */}
            <p>Don't have an account? <Link to="/register" className="register-link">Sign up here</Link></p> {/* Кнопка реєстрації */}
        </div>
    );
};

export default Login;
