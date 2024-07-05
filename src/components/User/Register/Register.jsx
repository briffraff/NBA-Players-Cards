import { useState } from "react";
import { registerUser } from "../../../service/authentication/authService";

export default function Register() {
    const [form, setForm] = useState({
        email: "",
        password: "",
        repeatPassword: "",
        username: "",
    });
    const [error, setError] = useState("");

    const handleRegistration = async () => {
        if (form.password !== form.repeatPassword) {
            setError("Passwords do not match");
            return;
        }
        setError("");

        try {
            const { user } = await registerUser(form.email, form.password);
            console.log(user);
            setForm({ email: "", password: "", repeatPassword: "", username: "" });
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
        if (name === "password" || name === "repeatPassword") {
            if (name === "password" && value === form.repeatPassword) {
                setError("");
            }
            if (name === "repeatPassword" && value === form.password) {
                setError("");
            }
        }
    };

    return (
        <>
            <div className="login-box">
                <h1 className="box-slogan">Register</h1>

                <div className="textbox">
                    <i className="fas fa-user"></i>
                    <input type="text" name="username" placeholder="Username" value={form.username} onChange={handleChange} />
                </div>

                <div className="textbox">
                    <i className="fas fa-lock"></i>
                    <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} />
                </div>

                <div className="textbox">
                    <i className="fas fa-unlock"></i>
                    <input type="password" name="repeatPassword" placeholder="Repeat Password" value={form.repeatPassword} onChange={handleChange} />
                </div>

                <div className="textbox">
                    <i className="fas fa-envelope"></i>
                    <input type="email" name="email" placeholder="E-mail" value={form.email} onChange={handleChange} />
                </div>

                {error && <div className="error-message">{error}</div>}

                <input className="login-btn" type="button" value="REGISTER" onClick={handleRegistration} />
            </div>
        </>
    );
}
