import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItem, decreaseItem, removeItem } from '../redux/redux';
import './cartPage.css';

const CartPage = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.items);

    const handleIncrease = (item) => {
        dispatch(addItem(item));
    };

    const handleDecrease = (item) => {
        dispatch(decreaseItem(item));
    };

    const handleRemove = (name) => {
        dispatch(removeItem(name));
    };

    // Перевірка на NaN при обчисленні загальної суми
    const totalAmount = cartItems.reduce((total, item) => {
        const price = parseFloat(item.price.toString().replace(/[^0-9.-]+/g, "")); // Видаляє символи, окрім цифр і точки
        return total + (price * (item.count || 0));
    }, 0);

    return (
        <div className="cart-page">
            <h2>Shopping Cart</h2>
            <ul className="cart-items">
                {cartItems.map((item, index) => (
                    <li key={index} className="cart-item">
                        <img src={item.image} alt={item.name} className="item-image"/>
                        <div className="item-details">
                            <p className="item-name">{item.name}</p>
                            <p className="item-price">${item.price}</p>
                        </div>
                        <div className="item-quantity">
                            <button onClick={() => handleDecrease(item)}>-</button>
                            <span>{item.count}</span>
                            <button onClick={() => handleIncrease(item)}>+</button>
                        </div>
                        <p className="item-total">
                            ${(item.price && item.count) ? (parseFloat(item.price.toString().replace(/[^0-9.-]+/g, "")) * item.count).toFixed(2) : '0'}
                        </p>

                        <button onClick={() => handleRemove(item.name)} className="remove-button">Remove</button>
                    </li>
                ))}
            </ul>
            <div className="cart-summary">
                <p>Total amount: <strong>${totalAmount.toFixed(2)}</strong></p>
                <button className="continue-button">Continue</button>
            </div>
            <button className="back-button">
                <a href="/catalog" className="back-link">Back to Catalog</a>
            </button>

        </div>
    );
};

export default CartPage;
