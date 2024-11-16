import React, { useState, useEffect } from 'react';
import './catalog.css';
import { Link } from 'react-router-dom';
import Spinner from '../spinner/spinner.jsx'; // Імпортуємо компонент спінера
import axios from 'axios';

import airplane1 from '../../../assets/airplanes/1.jpg';
import airplane2 from '../../../assets/airplanes/2.jpeg';
import airplane3 from '../../../assets/airplanes/3.jpg';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));


const Catalog = () => {
    const [filterSize, setFilterSize] = useState('');
    const [filterColor, setFilterColor] = useState('');
    const [filterType, setFilterType] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredAirplanes, setFilteredAirplanes] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchAirplanes = async () => {
        setLoading(true);
        try {
            await delay(1000);
            const params = {};
            if (filterSize) params.size = filterSize;
            if (filterColor) params.color = filterColor;
            if (filterType) params.type = filterType;
            if (searchQuery) params.search = searchQuery;

            const response = await axios.get('http://localhost:5021/api/plane', { params });
            setFilteredAirplanes(response.data);
        } catch (error) {
            console.error('Error fetching airplanes:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAirplanes();
    }, [filterSize, filterColor, filterType, searchQuery]);

    const handleApplyFilters = () => {
        fetchAirplanes();
    };

    return (
        <div className="catalog">
            <header>
                <div className="logo">
                    {/* Ваш логотип */}
                </div>
            </header>

            {/* Блок фільтрів та пошуку */}
            <div className="filter-search-container">
                <h2>Filter Planes</h2>
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
                {loading ? (
                    <Spinner />
                ) : (
                    <>
                        {filteredAirplanes.length > 0 || filterSize || filterColor || filterType || searchQuery ? (
                            filteredAirplanes.map((airplane, index) => {
                                // Використовуємо імпортовані зображення
                                let airplaneImage;
                                switch (airplane.id) {
                                    case 1:
                                        airplaneImage = airplane1;
                                        break;
                                    case 2:
                                        airplaneImage = airplane2;
                                        break;
                                    case 3:
                                        airplaneImage = airplane3;
                                        break;
                                    default:
                                        airplaneImage = null;
                                }

                                return (
                                    <div key={index} className="airplane-card">
                                        {airplaneImage && <img src={airplaneImage} alt={airplane.name} className="airplane-image" />}
                                        <h2>{airplane.name}</h2>
                                        <div className="airplane-description">
                                            <p>{airplane.description}</p>
                                        </div>
                                        <p className="airplane-price">Ціна: {airplane.price}</p>
                                        <Link to={`/item/${airplane.name}`} className="view-details-button">
                                            View Details
                                        </Link>
                                    </div>
                                );
                            })
                        ) : (
                            <p>Немає літаків, що відповідають вашим критеріям.</p>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Catalog;
