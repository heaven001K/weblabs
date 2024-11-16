import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import plane1 from '../../../assets/airplanes/1.jpg';
import plane2 from '../../../assets/airplanes/2.jpeg';
import plane3 from '../../../assets/airplanes/3.jpg';
import './item.css';
import { useDispatch } from 'react-redux';
import { addItem } from '../redux/redux'; // Упевніться, що `addItem` експортується коректно

const airplanes = [
    {
        image: plane1,
        name: 'Боїнг 747',
        description: 'Цей літак є великим пасажирським літаком з чотирма двигунами. Він забезпечує високу швидкість і комфорт для пасажирів, ідеально підходить для довгих міжнародних рейсів.',
        price: '150,000,000 $',
        count: 5,
        characteristics: [
            { key: 'Двигуни', value: '4' },
            { key: 'Максимальна швидкість', value: '945 км/год' },
            { key: 'Дальність польоту', value: '13,450 км' },
        ],
    },
    {
        image: plane2,
        name: 'Airbus A320',
        description: 'Airbus A320 є популярним літаком серед авіакомпаній, що забезпечує комфорт та ефективність для коротких і середніх рейсів. Його сучасні технології сприяють зниженню витрат на паливо та підвищують надійність.',
        price: '110,000,000 $',
        count: 3,
        characteristics: [
            { key: 'Двигуни', value: '2' },
            { key: 'Максимальна швидкість', value: '840 км/год' },
            { key: 'Дальність польоту', value: '6,300 км' },
        ],
    },
    {
        image: plane3,
        name: 'Пайпер Чирокі',
        description: 'Пайпер Чирокі — це невеликий літак, ідеальний для приватних польотів. Завдяки своїй маневреності та простоті в управлінні, він забезпечує чудовий досвід польоту для приватних пілотів та пасажирів.',
        price: '500,000 $',
        count: 10,
        characteristics: [
            { key: 'Двигуни', value: '1' },
            { key: 'Максимальна швидкість', value: '210 км/год' },
            { key: 'Дальність польоту', value: '1,200 км' },
        ],
    },
];

const ItemPage = () => {
    const { name } = useParams();
    const airplane = airplanes.find(plane => plane.name === name);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [showCharacteristics, setShowCharacteristics] = useState(false);
    const [showSelectable, setShowSelectable] = useState(false);

    if (!airplane) {
        return <p>Літак не знайдено!</p>;
    }

    const handleGoBack = () => {
        navigate('/catalog');
    };

    const handleAddToCart = () => {
        dispatch(addItem(airplane));
        alert(`Літак ${airplane.name} додано до кошика!`);
    };

    return (
        <div className="item-page">
            <div className="item-page-content">
                <img src={airplane.image} alt={airplane.name} className="item-image" />
                <div className="item-details">
                    <button
                        className="characteristics-button"
                        onClick={() => setShowCharacteristics(!showCharacteristics)}
                    >
                        Характеристики
                    </button>
                    {showCharacteristics && (
                        <div className="characteristics-list">
                            {airplane.characteristics.map((char, index) => (
                                <p key={index} className="characteristic-item">
                                    <small><strong>{char.key}:</strong> {char.value}</small>
                                </p>
                            ))}
                        </div>
                    )}
                    <h1>{airplane.name}</h1>
                    <p><strong>Опис:</strong> {airplane.description}</p>

                    <div className="buttons-container">
                        <button className="countable-button">
                            Кількість наявних літаків: {airplane.count}
                        </button>
                        <button
                            className="selectable-button"
                            onClick={() => setShowSelectable(!showSelectable)}
                        >
                            Вибрати літак
                        </button>
                        {showSelectable && (
                            <div className="selectable-list">
                                {airplanes.map((plane, index) => (
                                    <p key={index} className="selectable-item">
                                        {plane.name}
                                    </p>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="item-price">
                <p><strong>Ціна:</strong> {airplane.price}</p>
            </div>

            {/* Кнопки в правому нижньому куті */}
            <div className="action-buttons">
                <button className="go-back-button" onClick={handleGoBack}>
                    Go Back
                </button>
                <button className="add-to-cart-button" onClick={handleAddToCart}>
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

export default ItemPage;
