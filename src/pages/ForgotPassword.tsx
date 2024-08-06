import React, { useState, useEffect } from 'react';
import { Button, Form, Alert } from 'react-bootstrap';
import FormField from '../components/FormField';
import OtpVerificationForm from '../components/OtpVerificationForm';
import ResetPasswordForm from '../components/ResetPasswordForm';
import { validateLoginEmail, validatePhoneNumber } from '../utils/validators';
import { Link, useNavigate } from 'react-router-dom';
import designImage from '../assets/delivery_car.jpg';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import StepIndicator from '../components/StepIndicator';

const ForgotPassword: React.FC = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [emailValid, setEmailValid] = useState(false);
    const [phoneNumberValid, setPhoneNumberValid] = useState(false);
    const [otpValid, setOtpValid] = useState(false);
    const [newPasswordValid, setNewPasswordValid] = useState(false);
    const [confirmPasswordValid, setConfirmPasswordValid] = useState(false);
    const [emailErrors, setEmailErrors] = useState<string[]>([]);
    const [phoneNumberErrors, setPhoneNumberErrors] = useState<string[]>([]);
    const [otpErrors, setOtpErrors] = useState<string[]>([]);
    const [newPasswordErrors, setNewPasswordErrors] = useState<string[]>([]);
    const [confirmPasswordErrors, setConfirmPasswordErrors] = useState<string[]>([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [showError, setShowError] = useState(false);

    useEffect(() => {
        const emailErrorsTemp: string[] = [];
        const phoneNumberErrorsTemp: string[] = [];
        const otpErrorsTemp: string[] = [];
        const newPasswordErrorsTemp: string[] = [];
        const confirmPasswordErrorsTemp: string[] = [];

        if (!email) {
            emailErrorsTemp.push("You cannot leave the email blank");
        } else if (!validateLoginEmail(email)) {
            emailErrorsTemp.push("The email format is invalid");
        }

        if (!phoneNumber) {
            phoneNumberErrorsTemp.push("Phone number must not be entered blank");
        } else if (!validatePhoneNumber(phoneNumber)) {
            phoneNumberErrorsTemp.push("Invalid phone number format");
        }

        if (!otp) {
            otpErrorsTemp.push("OTP must not be entered blank");
        } else if (otp.length !== 6) {
            otpErrorsTemp.push("OTP must be 6 digits long");
        }

        if (!newPassword) {
            newPasswordErrorsTemp.push("New password must not be blank");
        } else if (newPassword.length < 8) {
            newPasswordErrorsTemp.push("New password must be at least 8 characters long");
        }

        if (confirmPassword !== newPassword) {
            confirmPasswordErrorsTemp.push("Passwords do not match");
        }

        setEmailErrors(emailErrorsTemp);
        setPhoneNumberErrors(phoneNumberErrorsTemp);
        setOtpErrors(otpErrorsTemp);
        setNewPasswordErrors(newPasswordErrorsTemp);
        setConfirmPasswordErrors(confirmPasswordErrorsTemp);

        setEmailValid(emailErrorsTemp.length === 0);
        setPhoneNumberValid(phoneNumberErrorsTemp.length === 0);
        setOtpValid(otpErrorsTemp.length === 0);
        setNewPasswordValid(newPasswordErrorsTemp.length === 0);
        setConfirmPasswordValid(confirmPasswordErrorsTemp.length === 0);
    }, [email, phoneNumber, otp, newPassword, confirmPassword]);

    const handlePhoneNumberKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        const charCode = event.charCode;
        if (charCode < 48 || charCode > 57) {
            event.preventDefault();
        }
    };

    const handleOtpKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        const charCode = event.charCode;
        if (charCode < 48 || charCode > 57) {
            event.preventDefault();
        }
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            // Simulate a password reset request
            toast.success('Password reset link sent to your email');
            setTimeout(() => {
                navigate('/');
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

    const handleNextStep = () => {
        if (currentStep === 1 && emailValid && phoneNumberValid) {
            setCurrentStep(2);
        } else if (currentStep === 2 && otpValid) {
            setCurrentStep(3);
        }
    };

    const handlePreviousStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleResetPasswordSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            // Simulate a password reset request
            toast.success('Password reset successful');
            setTimeout(() => {
                navigate('/');
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
                    <h2 className="text-center mb-6 text-xl font-bold">Forgot your password?</h2>
                    <StepIndicator currentStep={currentStep} />
                    <Form onSubmit={handleSubmit}>
                        {currentStep === 1 && (
                            <>
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
                                    label="Phone Number"
                                    type="text"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    onKeyPress={handlePhoneNumberKeyPress}
                                    isValid={phoneNumberValid}
                                    errorMessages={phoneNumberErrors}
                                    placeholder="Phone Number"
                                    maxLength={10}
                                />
                                {showError && errorMessage && (
                                    <Alert variant="danger" className="text-center mb-3">
                                        {errorMessage}
                                    </Alert>
                                )}
                                <Button variant="primary" className="w-full mt-4" onClick={handleNextStep} disabled={!emailValid || !phoneNumberValid}>
                                    Next
                                </Button>
                                <div className="text-center mt-3">
                                    <span>
                                        Back to <Link to="/" className="text-purple-600"> login</Link>
                                    </span>
                                </div>
                            </>
                        )}
                        {currentStep === 2 && (
                            <>
                                <OtpVerificationForm
                                    otp={otp}
                                    setOtp={setOtp}
                                    otpValid={otpValid}
                                    otpErrors={otpErrors}
                                    handleOtpKeyPress={handleOtpKeyPress}
                                />
                                <div className="d-flex justify-content-between mt-4">
                                    <Button variant="secondary" className="mr-2" style={{ width: '100px' }} onClick={handlePreviousStep}>
                                        Back
                                    </Button>
                                    <Button
                                        variant="primary"
                                        className="flex-grow-1"
                                        onClick={handleNextStep}
                                        disabled={!otpValid}
                                    >
                                        Verify OTP
                                    </Button>
                                </div>
                            </>
                        )}
                        {currentStep === 3 && (
                            <Form onSubmit={handleResetPasswordSubmit}>
                                <ResetPasswordForm
                                    newPassword={newPassword}
                                    confirmPassword={confirmPassword}
                                    setNewPassword={setNewPassword}
                                    setConfirmPassword={setConfirmPassword}
                                    newPasswordValid={newPasswordValid}
                                    confirmPasswordValid={confirmPasswordValid}
                                    newPasswordErrors={newPasswordErrors}
                                    confirmPasswordErrors={confirmPasswordErrors}
                                />
                                <div className="d-flex justify-content-between mt-4">
                                    <Button variant="secondary" className="mr-2" style={{ width: '100px' }} onClick={handlePreviousStep}>
                                        Back
                                    </Button>
                                    <Button
                                        variant="primary"
                                        type="submit"
                                        className="flex-grow-1"
                                        disabled={!newPasswordValid || !confirmPasswordValid}
                                    >
                                        Reset Password
                                    </Button>
                                </div>
                            </Form>
                        )}
                    </Form>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default ForgotPassword;
