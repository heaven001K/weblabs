import React, { useState } from 'react'; // Імпортуємо useState
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Header from './components/entities/headers/header';
import Hero from './components/entities/hero/hero';
import Article from './components/entities/articles/article';
import Footer from './components/entities/footers/footer';
import Catalog from './components/entities/catalog/catalog';
import ItemPage from './components/entities/item/item';
import CartPage from './components/entities/cartPage/cartPage';

import './App.css';

const App = () => {
    const articles = [
        { title: 'Історія літаків', content: 'Літаки з’явилися на початку 20 століття, і з тих пір вони еволюціонували в неймовірні машини.' },
        { title: 'Як працюють літаки?', content: 'Літаки використовують принципи аеродинаміки для того, щоб літати. Основні компоненти включають крила, двигуни та фюзеляж.' },
        { title: 'Технології у авіації', content: 'Сучасні літаки використовують передові технології для безпеки та комфорту пасажирів.' },
        { title: 'Екологічність авіації', content: 'Сучасні авіакомпанії працюють над зниженням викидів та розробкою більш екологічних літаків.' },
        { title: 'Майбутнє авіації', content: 'Очікується, що в майбутньому авіація стане ще більш екологічною та технологічною.' },
        { title: 'Авіаційна безпека', content: 'Безпека є пріоритетом у всіх авіаційних компаніях.' },
    ];

    const [visibleArticles, setVisibleArticles] = useState(2); // Стан для кількості видимих статей

    const handleShowMore = () => {
        setVisibleArticles(prev => prev + 2); // Збільшуємо кількість видимих статей на 2
    };

    return (
        <Router>
            <div className="app-container">
                <Header />
                <Routes>
                    <Route
                        path="/"
                        element={
                            <>
                                <Hero />
                                <main>
                                    <section id="articles" className="articles-section">
                                        <div className="main-title">
                                            <div className="articles-grid">
                                                {articles.slice(0, visibleArticles).map((article, index) => (
                                                    <Article key={index} title={article.title} content={article.content} />
                                                ))}
                                            </div>
                                            {visibleArticles < articles.length && ( // Показуємо кнопку, якщо є ще статті
                                                <div className="show-more">
                                                    <button className="plane-catalog-button" onClick={handleShowMore}>
                                                        Show More
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </section>
                                </main>
                            </>
                        }
                    />
                    <Route path="/catalog" element={<Catalog />} />
                    <Route path="/item/:name" element={<ItemPage />} />
                    <Route path="/cart" element={<CartPage />} />

                </Routes>
                <div className="footer-container">
                    <Footer />
                </div>
            </div>
        </Router>
    );
};

export default App;
