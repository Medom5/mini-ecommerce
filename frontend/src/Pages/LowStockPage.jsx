import {useEffect, useState} from 'react';

const LowStockPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');


    useEffect(() => {
        fetchLowStock();
    }, []);

    const fetchLowStock = async () => {
        try {
            const token = sessionStorage.getItem('token');
            const response = await fetch('http://localhost:8080/admin/low-stock', {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            });
            if (response.ok) {
                const data = await response.json();
                setProducts(data);
            } else {
                setError('Failed to fetch low-stock products');
            }
        } catch (err) {
            setError('Network error. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="text-center py-12">Loading...</div>;
    if (error) return <div className="text-red-600 text-center py-12">{error}</div>;

    return (<div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <h1 className="text-xl font-bold text-gray-900">Low Stock Products</h1>
                        <button
                            onClick={() => window.location.href = '/admin/products'}
                            className="text-blue-600 hover:text-blue-800 font-medium"
                        >
                            Back to Products
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {products.length === 0 ? (
                    <div className="text-center py-12 text-gray-500">No low-stock products.</div>) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {products.map((product) => (
                            <div key={product.id} className="bg-white rounded-xl shadow-sm border p-4">
                                <h3 className="font-semibold text-gray-900 text-lg mb-2">{product.name}</h3>
                                <p className="text-gray-500">Price: ${Number(product.price).toFixed(2)}</p>
                                <p className="text-red-600 font-medium">Stock: {product.stock}</p>
                            </div>))}
                    </div>)}
            </main>
        </div>);
};

export default LowStockPage;