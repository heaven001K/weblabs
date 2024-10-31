import React from 'react';
import { useNavigate } from 'react-router-dom'; // Імпортуємо useNavigate
import './article.css'; // Імпорт CSS файлу

const Article = ({ title, content }) => {
    const navigate = useNavigate(); // Використовуємо useNavigate для переходу

    const handleGoToCatalog = () => {
        navigate('/catalog'); // Переходимо до каталогу
    };

    return (
        <div className="article">
            <h3>{title}</h3>
            <p>{content}</p>
            <button className="go-to-catalog-button" onClick={handleGoToCatalog}>
                Let's go to catalog
            </button>
        </div>
    );
};

export default Article;
