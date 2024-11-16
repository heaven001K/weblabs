// src/components/entities/headers/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom'; // Імпорт Link для маршрутизації
import './header.css'; // Імпорт CSS файлу
import logo from '../../../assets/photo_2023-10-08_01-01-24.jpg';

const Header = () => {
    return (
        <header>
            <img src={logo} alt="Логотип" className="logo" /> {/* Додаємо логотип */}
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li> {/* Зміна на Link */}
                    <li><Link to="/catalog">Catalog</Link></li> {/* Зміна на Link */}
                    <li><Link to="/cart">Кошик</Link></li> {/* Можна залишити як є, якщо це прокрутка */}
                </ul>
            </nav>
        </header>
    );
};

export default Header;
