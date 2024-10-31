import React, { useState } from 'react';
import './catalog.css';
import plane1 from '../../../assets/airplanes/1.jpg';
import plane2 from '../../../assets/airplanes/2.jpeg';
import plane3 from '../../../assets/airplanes/3.jpg';
import { Link } from 'react-router-dom'; // Імпортуємо Link

const Catalog = () => {
    const [filterSize, setFilterSize] = useState('');
    const [filterColor, setFilterColor] = useState('');
    const [filterType, setFilterType] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredAirplanes, setFilteredAirplanes] = useState([]); // Додати стан для відфільтрованих літаків

    const airplanes = [
        {
            image: plane1,
            name: 'Боїнг 747',
            description: 'Великий пасажирський літак з чотирма двигунами.',
            price: '150,000,000 $',
            size: 'large',
            color: 'white',
            type: 'commercial',
        },
        {
            image: plane2,
            name: 'Airbus A320',
            description: 'Середній пасажирський літак для коротких рейсів.',
            price: '110,000,000 $',
            size: 'medium',
            color: 'blue',
            type: 'commercial',
        },
        {
            image: plane3,
            name: 'Пайпер Чирокі',
            description: 'Невеликий літак для приватних польотів.',
            price: '500,000 $',
            size: 'small',
            color: 'red',
            type: 'private',
        },
    ];

    const handleApplyFilters = () => {
        const filtered = airplanes.filter((airplane) => {
            const matchesSize = filterSize ? airplane.size === filterSize : true;
            const matchesColor = filterColor ? airplane.color === filterColor : true;
            const matchesType = filterType ? airplane.type === filterType : true;
            const matchesSearch = airplane.name.toLowerCase().includes(searchQuery.toLowerCase());

            return matchesSize && matchesColor && matchesType && matchesSearch;
        });
        setFilteredAirplanes(filtered); // Оновлюємо стан відфільтрованих літаків
    };

    return (
        <div className="catalog">
            <header>
                <div className="logo">
                    <h1>Каталог Літаків</h1>
                </div>
            </header>

            {/* Блок фільтрів та пошуку */}
            <div className="filter-search-container">
                <h2>Filter Planes</h2> {/* Доданий заголовок */}
                <div className="filter-container">
                    <select value={filterSize} onChange={(e) => setFilterSize(e.target.value)}>
                        <option value="">Size</option>
                        <option value="small">Small</option>
                        <option value="medium">Medium</option>
                        <option value="large">Large</option>
                    </select>
                    <select value={filterColor} onChange={(e) => setFilterColor(e.target.value)}>
                        <option value="">Color</option>
                        <option value="red">Red</option>
                        <option value="blue">Blue</option>
                        <option value="white">White</option>
                    </select>
                    <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
                        <option value="">Type</option>
                        <option value="commercial">Commercial</option>
                        <option value="private">Private</option>
                    </select>
                    <button onClick={handleApplyFilters}>Apply</button>
                </div>
                <input
                    type="text"
                    placeholder="Пошук літаків..."
                    className="search-input"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            {/* Список літаків */}
            <div className="airplane-list">
                {filteredAirplanes.length > 0 ? filteredAirplanes.map((airplane, index) => (
                    <div key={index} className="airplane-card">
                        <img src={airplane.image} alt={airplane.name} className="airplane-image" />
                        <h2>{airplane.name}</h2>
                        <div className="airplane-description">
                            <p>{airplane.description}</p>
                        </div>
                        <p className="airplane-price">Ціна: {airplane.price}</p>
                        <Link to={`/item/${airplane.name}`} className="view-details-button">
                            View Details
                        </Link>
                    </div>
                )) : (
                    <p>Немає літаків, що відповідають вашим критеріям.</p>
                )}
            </div>
        </div>
    );
};

export default Catalog;
