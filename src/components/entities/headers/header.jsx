import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './header.css';
import logo from '../../../assets/photo_2023-10-08_01-01-24.jpg';

const Header = () => {
    const navigate = useNavigate();

    // Перевірка, чи користувач залогінений
    const userEmail = localStorage.getItem('userEmail');

    // Функція для виходу
    const handleSignOut = () => {
        localStorage.removeItem('userEmail'); // Видаляємо email зі storage
        navigate('/'); // Перенаправляємо на головну
    };

    return (
        <header>
            <img src={logo} alt="Логотип" className="logo" />
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/catalog">Catalog</Link></li>
                    <li><Link to="/cart">Кошик</Link></li>
                    {/* Якщо користувач залогінений, показуємо кнопку Sign Out, інакше Sign In */}
                    <li>
                        {userEmail ? (
                            <button className="auth-button" onClick={handleSignOut}>Sign Out</button>
                        ) : (
                            <Link to="/login" className="auth-button">Sign In</Link>
                        )}
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
