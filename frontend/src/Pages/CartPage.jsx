import {useEffect, useState} from 'react';

const CartPage = () => {
    const [cart, setCart] = useState([]);
    const [username, setUsername] = useState("");

    // Load cart and user from sessionStorage
    useEffect(() => {
        const savedCart = sessionStorage.getItem('cart');
        if (savedCart) setCart(JSON.parse(savedCart));

        const savedUser = sessionStorage.getItem('username');
        if (savedUser) setUsername(savedUser);
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
        setCart(prev => prev.map(item => item.id === id ? {...item, quantity: Math.max(1, qty)} : item));
    };

    const placeOrder = async () => {
        if (!username || cart.length === 0) {
            alert('Cart is empty or user not logged in');
            return;
        }

        // Build order payload with `username` field
        const orderPayload = {
            username: username,
            items: cart.map(item => ({
                product: { id: item.id },
                quantity: item.quantity,
                price: item.price
            }))
        };


        console.log(JSON.stringify(orderPayload));

        try {
            // Get token from sessionStorage
            const token = sessionStorage.getItem('token');
            if (!token) {
                alert('You are not logged in');
                return;
            }
            const response = await fetch('http://localhost:8080/orders', {
                method: 'POST', headers: {
                    'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`
                }, body: JSON.stringify(orderPayload)
            });

            if (response.ok) {
                alert('Order placed successfully!');
                setCart([]); // clear cart
                sessionStorage.removeItem('cart');
            } else {
                // Only try parsing JSON if response has a body
                let errorData = {};
                try {
                    errorData = await response.json();
                } catch (err) {
                    console.warn('Server returned no JSON:', err);
                }
                console.error('Order failed:', errorData);
                alert('Failed to place order');
            }
        } catch (err) {
            console.error('Network error:', err);
            alert('Network error. Please try again.');
        }
    };

    return (<div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <h1 className="text-xl font-bold text-gray-900">Your Cart</h1>
                    <button
                        onClick={() => window.location.href = '/catalog'}
                        className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                        Back to Catalog
                    </button>
                </div>
            </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {cart.length === 0 ? (<div className="text-center py-12 text-gray-500">Your cart is empty.</div>) : (
                <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 gap-6">
                    {cart.map(item => (<div key={item.id}
                                            className="bg-white rounded-xl shadow-sm border p-4 flex justify-between items-center">
                        <div>
                            <h3 className="font-semibold text-gray-900">{item.name}</h3>
                            <p className="text-gray-500">Price: ${item.price.toFixed(2)}</p>
                            <p className="text-gray-500">Subtotal:
                                ${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                            <input
                                type="number"
                                min="1"
                                max={item.stock} // optional: prevent exceeding stock
                                value={item.quantity}
                                onChange={e => updateQuantity(item.id, parseInt(e.target.value))}
                                className="w-16 border rounded px-2 py-1 text-center"
                            />
                            <button
                                onClick={() => removeItem(item.id)}
                                className="text-red-600 hover:text-red-800"
                            >
                                Remove
                            </button>
                        </div>
                    </div>))}

                    {/* Total and Place Order */}
                    <div className="bg-white rounded-xl shadow-sm border p-4 flex justify-between items-center">
                        <div className="text-lg font-bold">Total: ${totalPrice.toFixed(2)}</div>
                        <button
                            onClick={placeOrder}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium"
                        >
                            Place Order
                        </button>
                    </div>
                </div>)}
        </main>
    </div>);
};

export default CartPage;
