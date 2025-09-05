import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

const LoginPage = () => {
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    // handle input
    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
        if (error) setError(error); // clear error when typing again
    }
    const navigate = useNavigate();

    // handle submit
    const handleSubmit = async () => {

        if (!formData.username || !formData.password) {
            setError("Please fill in all fields");
            setLoading(false);
            return;
        }

        // Simple email format check
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.username)) {
            setError("Please enter a valid email");
            return;
        }

        setError("");
        setLoading(true);

        try {

            const response = await fetch("http://localhost:8080/auth/login", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const token = await response.text();
                sessionStorage.setItem("token", token);
                sessionStorage.setItem("username", formData.username);
                navigate("/catalog"); // redirect to home page after login
            } else {
                const errData = await response.json();
                setError(errData.message || "Login failed");
            }
        } catch (err) {
            setError("Network error. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    const goToRegister = () => {
        navigate("/register");
    };


    return (
        <div
            className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
            <div className="max-w-md w-full bg-white shadow-xl rounded-2xl p-6">
                <h2 className="text-2xl font-bold mb-4">Welcome Back</h2>
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
                    className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 mb-3"
                >
                    {loading ? "Signing in..." : "Sign In"}
                </button>

                {/* Register Button */}
                <button
                    onClick={goToRegister}
                    className="w-full border border-blue-600 text-blue-600 py-3 rounded-lg hover:bg-blue-50"
                >
                    Sign Up
                </button>
            </div>
        </div>
    );
};

export default LoginPage;
