import {useEffect, useState} from 'react';

const CartPage = () => {
    const [cart, setCart] = useState([]);
    const [user, setUser] = useState(null);

    // Load cart and user from sessionStorage
    useEffect(() => {
        const savedCart = sessionStorage.getItem('cart');
        if (savedCart) setCart(JSON.parse(savedCart));

        const savedUser = sessionStorage.getItem('user');
        if (savedUser) setUser(JSON.parse(savedUser));
    }, []);

    // Update sessionStorage whenever cart changes
    useEffect(() => {
        sessionStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    // Calculate total price
    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    // Remove item from cart
    const removeItem = (id) => {
        setCart(prev => prev.filter(item => item.id !== id));
    };

    // Adjust quantity
    const updateQuantity = (id, qty) => {
        setCart(prev =>
            prev.map(item => item.id === id ? {...item, quantity: Math.max(1, qty)} : item)
        );
    };

