import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../service/firebase/firebase";

export default function Login() {
    const [form, setForm] = useState({
        email: '',
        password: ''
    })

    const [error, setError] = useState('')

    const handleLogin = () => {
        signInWithEmailAndPassword(auth, form.email, form.password)
            .then((userCredentials) => {
                const user = userCredentials.user;
                console.log(user);
                setForm({
                    email: '',
                    password: ''
                })
                setError('')
            }).catch((error) => {
                let errorMessage = '';
                console.log(errorMessage);
                switch (error.message) {
                    case 'Firebase: Error (auth/invalid-email).':
                        errorMessage = 'Invalid email address';
                        break;
                    case 'Firebase: Error (auth/missing-password).':
                        errorMessage = 'Missing password';
                        break;
                    case 'Firebase: Error (auth/invalid-credential).':
                        errorMessage = 'Invalid credentials';
                        break;
                    default:
                        errorMessage = error.message;
                }
         
                console.log(errorMessage);
                setError(errorMessage);
            });
    };


    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm((prevForm) => ({
            ...prevForm,
            [name]: value
        }));
    };


    return (
        <>
            <div className="login-box">

                <h1 className="box-slogan">Login</h1>

                <div className="textbox">
                    <i className="fas fa-envelope"></i>
                    <input type="email" name="email" placeholder="E-mail" value={form.email} onChange={handleChange}
                    />
                </div>

                <div className="textbox">
                    <i className="fas fa-lock"></i>
                    <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} />
                </div>

                {error && <div className="error-message">{error}</div>}

                <input className="login-btn" type="button" value="LOGIN" onClick={handleLogin} />
            </div>
        </>
    )
}