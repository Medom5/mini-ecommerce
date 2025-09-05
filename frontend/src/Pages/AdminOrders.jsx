import { useEffect, useState } from 'react';

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
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
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
