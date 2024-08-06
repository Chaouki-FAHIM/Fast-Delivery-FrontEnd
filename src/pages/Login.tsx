import React, { useState, useEffect } from 'react';
import { Button, Form, Alert } from 'react-bootstrap';
import FormField from '../components/FormField';
import LoginService from '../services/LoginService';
import { validateLoginEmail, validateLoginPassword } from '../utils/validators';
import { Link, useNavigate } from 'react-router-dom';
import designImage from '../assets/buy_delivery.jpg';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailValid, setEmailValid] = useState(false);
    const [passwordValid, setPasswordValid] = useState(false);
    const [emailErrors, setEmailErrors] = useState<string[]>([]);
    const [passwordErrors, setPasswordErrors] = useState<string[]>([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [showError, setShowError] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const emailErrorsTemp: string[] = [];
        const passwordErrorsTemp: string[] = [];

        if (!email) {
            emailErrorsTemp.push("You cannot leave the email blank");
        } else if (!validateLoginEmail(email)) {
            emailErrorsTemp.push("The email format is invalid");
        }

        if (!password) {
            passwordErrorsTemp.push("Password must not be entered blank");
        } else if (!validateLoginPassword(password)) {
            passwordErrorsTemp.push("Password must be at least 8 characters long");
        }

        setEmailErrors(emailErrorsTemp);
        setPasswordErrors(passwordErrorsTemp);
        setEmailValid(emailErrorsTemp.length === 0);
        setPasswordValid(passwordErrorsTemp.length === 0);
    }, [email, password]);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            await LoginService.login({ email, password });
            toast.success('Login successful');
            setTimeout(() => {
                navigate('/home');
            }, 2000); // Redirige après 2 secondes
        } catch (error) {
            setErrorMessage(error as string);
            setShowError(true);
            setTimeout(() => {
                setShowError(false);
                setErrorMessage('');
            }, 3000); // Cache l'erreur après 3 secondes
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-purple-600 p-4 sm:p-0">
            <div className="w-full max-w-4xl bg-white p-0 rounded shadow-lg flex">
                <div className="hidden md:flex w-1/2 bg-cover bg-center rounded-l" style={{ backgroundImage: `url(${designImage})` }}>
                    {/* Vous pouvez ajouter plus de contenu ici si nécessaire */}
                </div>
                <div className="w-full md:w-1/2 p-8">
                    <h2 className="text-center mb-6 text-xl font-bold">Sign in to your account</h2>
                    <Form onSubmit={handleSubmit}>
                        <FormField
                            label="Email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            isValid={emailValid}
                            errorMessages={emailErrors}
                            placeholder="Email Address"
                        />
                        <FormField
                            label="Password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            isValid={passwordValid}
                            errorMessages={passwordErrors}
                            placeholder="Password"
                        />
                        {showError && errorMessage && (
                            <Alert variant="danger" className="text-center mb-3">
                                {errorMessage}
                            </Alert>
                        )}
                        <Button
                            variant="primary"
                            type="submit"
                            className="w-full mt-4"
                            disabled={!emailValid || !passwordValid}
                        >
                            Sign In
                        </Button>
                        <div className="text-center mt-3">
                            <Link to="/forgot-password" className="text-purple-600">Forgot your password?</Link>
                        </div>
                        <div className="text-center mt-3">
                            <span>Not a member? </span>
                            <Link to="/register" className="text-purple-600">Sign up now</Link>
                        </div>
                    </Form>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Login;
