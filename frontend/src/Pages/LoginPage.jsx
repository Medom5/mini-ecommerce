import React, {useState} from "react";


const LoginPage = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    // handle input
    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
        if (error) setError(error); // clear error when typing again
    }

    // handle submit
    const handleSubmit = async () => {
        setError("");
        setLoading(true);

        if (!formData.email || !formData.password) {
            setError("Please fill in all fields");
            setLoading(false);
            return;
        }

        try {
            const response = await fetch("http://localhost:8080/auth/login", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const token = await response.json();
                sessionStorage.setItem("token", token);
                sessionStorage.setItem("user", formData.email);
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


    return (
        <div>
            <h2>Login Page</h2>

            {error && <p style={{color: "red"}}>{error}</p>}

            <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
            />

            <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
            />

            <button onClick={handleSubmit} disabled={loading}>
                {loading ? "Signing in..." : "Sign In"}
            </button>
        </div>
    );
};

export default LoginPage;
