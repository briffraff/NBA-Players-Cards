import { useState } from "react";
import { loginUser } from "../../../service/authentication/authService";

export default function Login() {
    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const [error, setError] = useState("");

    const handleLogin = async () => {
        try {
            const { user } = await loginUser(form.email, form.password);
            console.log(user);
            setForm({ email: "", password: "" });
            setError("");
        } catch (error) {
            setError(error.message);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm((prevForm) => ({
            ...prevForm,
            [name]: value,
        }));
    };

    return (
        <>
            <div className="login-box">
                <h1 className="box-slogan">Login</h1>

                <div className="textbox">
                    <i className="fas fa-envelope"></i>
                    <input type="email" name="email" placeholder="E-mail" value={form.email} onChange={handleChange} />
                </div>

                <div className="textbox">
                    <i className="fas fa-lock"></i>
                    <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} />
                </div>

                {error && <div className="error-message">{error}</div>}

                <input className="login-btn" type="button" value="LOGIN" onClick={handleLogin} />
            </div>
        </>
    );
}
