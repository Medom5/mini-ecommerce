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

    const placeOrder = async () => {
        if (!user || cart.length === 0) {
            alert('Cart is empty or user not logged in');
            return;
        }

        // Matching the body json format
        const orderPayload = {
            email: user.email,
            items: cart.map(item => ({ productId: item.id, quantity: item.quantity }))
        };

        try {
            const token = sessionStorage.getItem('token');
            const response = await fetch('http://localhost:8080/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(orderPayload)
            });

            if (response.ok) {
                alert('Order placed successfully!');
                setCart([]); // clear cart
                sessionStorage.removeItem('cart');
            } else {
                alert('Failed to place order');
            }
        } catch (err) {
            console.error(err);
            alert('Network error');
        }
    };
