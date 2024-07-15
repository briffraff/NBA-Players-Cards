import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../../service/firebase/authentication/auth-service";
import { useDefaultImages } from "../../../contexts/defaultImagesContext";

export default function Register() {
    const defaultImages = useDefaultImages();
    const backgroundImage = defaultImages[0];

    const [form, setForm] = useState({
        email: "",
        password: "",
        repeatPassword: "",
        username: "",
        // profilePictureUrl: "",
    });
    const navigate = useNavigate();
    const [error, setError] = useState("");

    const handleRegistration = async (event) => {
        event.preventDefault();

        if (form.password !== form.repeatPassword) {
            setError("Passwords do not match");
            return;
        }

        if (form.username === "") {
            setError("Username cannot be empty");
            return;
        }

        try {
            const { user } = await registerUser(form.username, form.email, form.password);
            console.log(user);
            setForm({ email: "", password: "", repeatPassword: "", username: "" });
            setError("");
            navigate("/")
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
        if (name === "username" && value !== "") {
            setError("");
        }
    };

    return (
        <>
            <div className="site-wrapper">
                <section className=" welcome-media" style={{ backgroundImage: `url(${backgroundImage})` }}>
                    <section className="login-content">
                        <form className="login-box" onSubmit={handleRegistration}>
                            <h1 className="box-slogan">Register</h1>

                            <div className="textbox">
                                <i className="fas fa-user"></i>
                                <input type="text" id="registerUsername" name="username" placeholder="Username" value={form.username} onChange={handleChange} />
                            </div>

                            <div className="textbox">
                                <i className="fas fa-lock"></i>
                                <input type="password" id="registerPassword" name="password" placeholder="Password" value={form.password} onChange={handleChange} />
                            </div>

                            <div className="textbox">
                                <i className="fas fa-unlock"></i>
                                <input type="password" id="registerRepeatPassword" name="repeatPassword" placeholder="Repeat Password" value={form.repeatPassword} onChange={handleChange} />
                            </div>

                            <div className="textbox">
                                <i className="fas fa-envelope"></i>
                                <input type="email" id="registerEmail" name="email" placeholder="E-mail" value={form.email} onChange={handleChange} />
                            </div>

                            {/* <div className="textbox">
                                <i className="fas fa-envelope"></i>
                                <input id="img" name="img" placeholder="Your profile picture" value={form.profilePictureUrl} onChange={handleChange} />
                            </div> */}

                            {error && <div className="error-message">{error}</div>}

                            <button className="login-btn" type="submit">REGISTER</button>
                        </form>
                    </section>
                </section>
            </div>
        </>
    );
}
