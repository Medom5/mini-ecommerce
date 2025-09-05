import {useState} from 'react';

const AdminAddProduct = () => {
    const [form, setForm] = useState({
        name: '', price: '', stock: ''
    });
    const [loading, setLoading] = useState(false);

    // Handle input changes
    const handleChange = (e) => {
        const {name, value} = e.target;
        setForm(prev => ({...prev, [name]: value}));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            name: form.name, price: parseFloat(form.price), stock: parseInt(form.stock)
        };

        try {
            setLoading(true);
            const token = sessionStorage.getItem('token');
            const response = await fetch('http://localhost:8080/products', {
                method: 'POST', headers: {
                    'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`
                }, body: JSON.stringify(payload)
            });

            if (response.ok) {
                alert('Product added successfully!');
                setForm({name: '', price: '', stock: ''});
            } else {
                alert('Failed to add product');
            }
        } catch (err) {
            console.error(err);
            alert('Network error');
        } finally {
            setLoading(false);
        }
    };
