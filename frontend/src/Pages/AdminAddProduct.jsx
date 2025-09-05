import { useState } from 'react';

const AdminAddProduct = () => {
    const [form, setForm] = useState({
        name: '',
        price: '',
        stock: ''
    });
    const [loading, setLoading] = useState(false);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

