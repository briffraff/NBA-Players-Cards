import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../../service/firebase/authentication/auth-service";
import { useDefaultImages } from "../../../contexts/defaultImagesContext";

export default function Login() {
    const defaultImages = useDefaultImages();
    const backgroundImage = defaultImages[0];

    const navigate = useNavigate();
    const [form, setForm] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState("");

    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            const { user } = await loginUser(form.email, form.password);
            console.log(user);
            setForm({ email: "", password: "" });
            setError("");
            navigate('/')
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
            <div className="site-wrapper">
                <section className=" welcome-media" style={{ backgroundImage: `url(${backgroundImage})` }}>
                    <section className="login-content">
                        <form className="login-box" onSubmit={handleLogin}>
                            <h1 className="box-slogan">Login</h1>

                            <div className="textbox">
                                <i className="fas fa-envelope"></i>
                                <input type="email" id="loginEmail" name="email" placeholder="E-mail" value={form.email} onChange={handleChange} />
                            </div>

                            <div className="textbox">
                                <i className="fas fa-lock"></i>
                                <input type="password" id="loginPassword" name="password" placeholder="Password" value={form.password} onChange={handleChange} />
                            </div>

                            {error && <div className="error-message">{error}</div>}

                            <button className="login-btn" type="submit">LOGIN</button>
                        </form>
                    </section>
                </section>
            </div>
        </>

    );
}
