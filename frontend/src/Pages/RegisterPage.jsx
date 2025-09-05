import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

const RegisterPage = () => {
    const [formData, setFormData] = useState({username: "", password: "", role: "USER"});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
        if (error) setError("");
    };

    const handleSubmit = async () => {
        const {username, password} = formData;

        if (!username || !password) {
            setError("Please fill in all fields");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(username)) {
            setError("Please enter a valid email");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const response = await fetch("http://localhost:8080/auth/register", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert("Registration successful! Please login.");
                navigate("/login");
            } else {
                const errData = await response.json();
                setError(errData.message || "Registration failed");
            }
        } catch {
            setError("Network error. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100 px-4">
            <div className="max-w-md w-full bg-white shadow-xl rounded-2xl p-6">
                <h2 className="text-2xl font-bold mb-4">Create Account</h2>
                {error && <p className="text-red-600 mb-2">{error}</p>}

                <input
                    type="email"
                    name="username"
                    placeholder="Email"
                    value={formData.username}
                    onChange={handleChange}
                    className="w-full mb-3 p-3 border rounded-lg"
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full mb-3 p-3 border rounded-lg"
                />

                <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 disabled:opacity-50"
                >
                    {loading ? "Signing up..." : "Sign Up"}
                </button>

                <button
                    onClick={() => navigate("/login")}
                    className="w-full mt-3 border border-green-600 text-green-600 py-3 rounded-lg hover:bg-green-50"
                >
                    Sign In
                </button>
            </div>
        </div>
    );
};

export default RegisterPage;
