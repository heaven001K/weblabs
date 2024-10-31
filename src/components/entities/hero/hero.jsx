// src/components/Hero.jsx
import React from 'react';
import "./hero.css";
import image from "../../../assets/1000_F_111224494_Vcl3eafzhx6Uc5GulbI2rk0eAOq0np59.jpg"
const Hero = () => {
    return (
        <section id="hero" className="hero-container">
            <div className="hero-content">
                <h2>Літаки: Ваша мрія в небі!</h2>
                <p>Літак — це повітряний засіб пересування, який дозволяє нам подорожувати по світу, досліджувати нові місця та здійснювати мрії про небо!</p>
            </div>
            <div className="hero-image">
                <img src={image} alt="Літак у небі" />
            </div>
        </section>
    );
};

export default Hero;
