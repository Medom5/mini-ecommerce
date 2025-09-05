import React, {useEffect, useState} from 'react';

const ProductCatalog = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [cart, setCart] = useState([]);

    // Load cart from sessionStorage
    useEffect(() => {
        const savedCart = sessionStorage.getItem('cart');
        if (savedCart) {
            setCart(JSON.parse(savedCart));
        }
    }, []);

    // Save cart on change
    useEffect(() => {
        sessionStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    // Fetch products
    useEffect(() => {
        fetchProducts().then((res) => console.log(res));
    }, []);


    const fetchProducts = async () => {
        try {
            const token = sessionStorage.getItem('token');
            const response = await fetch('http://localhost:8080/products', {
                headers: {
                    'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const data = await response.json();
                setProducts(data);
            } else {
                setError('Unauthorized request');
            }
        } catch (err) {
            setError('Network error. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const addToCart = (product) => {
        setCart(prevCart => {
            const cartArray = Array.isArray(prevCart) ? prevCart : []; // safety check

            const existingItem = cartArray.find(item => item.id === product.id);
            if (existingItem) {
                return cartArray.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                return [...cartArray, { ...product, quantity: 1 }];
            }
        });
    };

    const logout = () => {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('user');
        window.location.href = '/login';
    };

    const cartCount = Array.isArray(cart) ? cart.reduce((sum, item) => sum + (item.quantity || 0), 0) : 0;

    if (loading) {
        return (<div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="text-center">
                <svg
                    className="animate-spin -ml-1 mr-3 h-10 w-10 text-blue-600 mx-auto mb-4"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                    />
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0
                 C5.373 0 0 5.373 0 12h4
                 zm2 5.291A7.962 7.962 0 014 12H0
                 c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                </svg>
                <p className="text-gray-600">Loading products...</p>
            </div>
        </div>);
    }

    return (<div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center">
                        <div
                            className="h-8 w-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center mr-3">
                            <svg
                                className="w-5 h-5 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M16 11V7a4 4 0 00-8 0v4
                       M5 9h14l1 12H4L5 9z"
                                />
                            </svg>
                        </div>
                        <h1 className="text-xl font-bold text-gray-900">Mini E-commerce</h1>
                    </div>

                    <div className="flex items-center space-x-4">
                        <button
                            onClick={() => alert(`Cart has ${cart.reduce((sum, item) => sum + item.quantity, 0)} items`)}
                            className="relative p-2 text-gray-600 hover:text-blue-600 transition-colors"
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M3 3h2l.4 2M7 13h10l4-8H5.4
                       m0 0L7 13m0 0l-2.5 2.5M7 13l2.5 2.5"
                                />
                            </svg>
                            {cart.length > 0 && (<span
                                className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cart.reduce((sum, item) => sum + item.quantity, 0)}
                  </span>)}
                        </button>

                        <button
                            onClick={logout}
                            className="text-gray-600 hover:text-red-600 font-medium transition-colors"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900">Products</h2>
                <p className="text-gray-600 mt-2">Discover our amazing collection</p>
            </div>

            {error && (<div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                {error}
            </div>)}

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product) => (<div
                    key={product.id}
                    className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
                >
                    {/* Product Info */}
                    <div className="p-4">
                        <div className="flex items-start justify-between mb-2">
                            <h3 className="font-semibold text-gray-900 text-lg leading-tight">
                                {product.name}
                            </h3>
                            {product.stock === 0 && (<span
                                className="bg-red-100 text-red-700 text-xs font-medium px-2 py-1 rounded-full">
                      Out of Stock
                    </span>)}
                        </div>

                        <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold text-blue-600">
                    ${Number(product.price).toFixed(2)}
                  </span>
                            <span className="text-sm text-gray-500">
                    Stock: {product.stock}
                  </span>
                        </div>

                        <button
                            onClick={() => addToCart(product)}
                            disabled={product.stock === 0}
                            className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${product.stock === 0 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
                        >
                            {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                        </button>
                    </div>
                </div>))}
            </div>

            {/* Empty State */}
            {products.length === 0 && !loading && !error && (<div className="text-center py-12">
                <svg
                    className="mx-auto h-12 w-12 text-gray-400 mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M20 7l-8-4-8 4
                   m16 0l-8 4m8-4v10l-8 4
                   m0-10L4 7m8 4v10M4 7v10l8 4"
                    />
                </svg>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No products available
                </h3>
                <p className="text-gray-500">Check back later for new products.</p>
            </div>)}
        </main>

        {/* Cart Info */}
        {cart.length > 0 && (
            <div className="fixed bottom-4 right-4 bg-black bg-opacity-75 text-white p-3 rounded-lg text-sm max-w-xs">
                <div className="font-medium mb-1">Cart ({cartCount} items):</div>
                {cart.map(item => (<div key={item.id} className="text-xs">
                    {item.name} x{item.quantity}
                </div>))}
            </div>)}

    </div>);
};

export default ProductCatalog;
