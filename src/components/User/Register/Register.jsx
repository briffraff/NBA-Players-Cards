import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../service/firebase/firebase";

export default function Register() {
    const [form, setForm] = useState({
        email: '',
        password: '',
        repeatPassword: '',
        username: ''
    });
    const [error, setError] = useState('');

    // const isValidEmail = (email) => {
    //     const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    //     return emailPattern.test(email);
    // };

    const handleRegistration = () => {
        if (form.password !== form.repeatPassword) {
            setError('Passwords do not match');
            return;
        }
        setError('');

        createUserWithEmailAndPassword(auth, form.email, form.password)
            .then((userCredentials) => {
                const user = userCredentials.user;
                console.log(user);
                setForm({
                    email: '',
                    password: '',
                    repeatPassword: '',
                    username: ''
                });
                setError('')
            }).catch ((error) => {
                let errorMessage = '';
                console.log(error.message)
                switch (error.message) {
                    case 'Firebase: Error (auth/missing-email).':
                        errorMessage = 'Email cannot be empty';
                        break;
                    case 'Firebase: Error (auth/missing-password).':
                        errorMessage = 'Missing password';
                        break;
                    case 'Firebase: Error (auth/email-already-in-use).':
                        errorMessage = 'Email already in use';
                        break;
                    case 'Firebase: Error (auth/invalid-email).':
                        errorMessage = 'Invalid email address';
                        break;
                    case 'Firebase: Password should be at least 6 characters (auth/weak-password).':
                        errorMessage = 'Weak password';
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
        if (name === 'password' || name === 'repeatPassword') {
            if (name === 'password' && value === form.repeatPassword) {
                setError('');
            }
            if (name === 'repeatPassword' && value === form.password) {
                setError('');
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
                    <input type="email" name="email" placeholder="E-mail" value={form.email} onChange={handleChange}
                    />
                </div>

                {error && <div className="error-message">{error}</div>}

                <input className="login-btn" type="button" value="REGISTER" onClick={handleRegistration} />
            </div>
        </>
    );
}