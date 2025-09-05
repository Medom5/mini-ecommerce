import {useEffect, useState} from 'react';

const AdminOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');


    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const token = sessionStorage.getItem('token');
            const res = await fetch('http://localhost:8080/admin/orders', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (res.ok) {
                const data = await res.json();
                setOrders(data);
            } else {
                setError('Failed to fetch orders');
            }
        } catch (err) {
            setError('Network error');
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="text-center py-12">Loading orders...</div>;
    if (error) return <div className="text-red-600 py-12">{error}</div>;
    return (
        <div className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-2xl font-bold mb-6">All Orders</h1>
            <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 gap-6">
                {orders.map(order => (
                    <div key={order.orderId} className="bg-white rounded-xl shadow-sm border p-4">
                        <div className="flex justify-between items-center mb-2">
                            <h2 className="font-semibold text-gray-900">Order #{order.orderId}</h2>
                            <span className="text-gray-600">{order.username}</span>
                        </div>

                        <div className="border-t border-gray-200 mt-2 pt-2">
                            {order.items.map(item => (
                                <div key={item.productId} className="flex justify-between text-gray-700 py-1">
                                    <span>{item.productName} × {item.quantity}</span>
                                    <span>${item.totalPrice.toFixed(2)}</span>
                                </div>
                            ))}
                        </div>

                        <div
                            className="border-t border-gray-200 mt-2 pt-2 flex justify-between font-bold text-gray-900">
                            <span>Total:</span>
                            <span>${order.total.toFixed(2)}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminOrders;