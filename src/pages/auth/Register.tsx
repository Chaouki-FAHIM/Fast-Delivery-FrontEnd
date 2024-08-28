import React, { useState, useEffect } from 'react';
import { Button, Form, Alert } from 'react-bootstrap'; // Assurez-vous d'importer Alert
import AccountForm from '../../components/form/AccountForm';
import StepIndicator from '../../components/StepIndicator';
import ProfileForm from '../../components/form/ProfileForm';
import OtpVerificationForm from '../../components/form/OtpVerificationForm';
import RegisterService from '../../services/RegisterService'; // Assurez-vous d'importer RegisterService
import OtpService from '../../services/OtpService';
import CityService from '../../services/CityService';
import BankService from '../../services/BankService';
import { validateLoginEmail, validateLoginPassword, validatePhoneNumber, validateRib, validateCin } from '../../utils/validators';
import { Link, useNavigate } from 'react-router-dom';
import designImage from '../../assets/flyer_delivery.jpg';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register: React.FC = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [city, setCity] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [cin, setCin] = useState('');
    const [bankName, setBankName] = useState('');
    const [rib, setRib] = useState('');
    const [otp, setOtp] = useState('');

    const [emailValid, setEmailValid] = useState(false);
    const [passwordValid, setPasswordValid] = useState(false);
    const [confirmPasswordValid, setConfirmPasswordValid] = useState(false);
    const [phoneNumberValid, setPhoneNumberValid] = useState(false);
    const [ribValid, setRibValid] = useState(false);
    const [cinValid, setCinValid] = useState(false);
    const [otpValid, setOtpValid] = useState(false);

    const [emailErrors, setEmailErrors] = useState<string[]>([]);
    const [passwordErrors, setPasswordErrors] = useState<string[]>([]);
    const [confirmPasswordErrors, setConfirmPasswordErrors] = useState<string[]>([]);
    const [phoneNumberErrors, setPhoneNumberErrors] = useState<string[]>([]);
    const [ribErrors, setRibErrors] = useState<string[]>([]);
    const [cinErrors, setCinErrors] = useState<string[]>([]);
    const [otpErrors, setOtpErrors] = useState<string[]>([]);

    const [errorMessage, setErrorMessage] = useState('');
    const [showError, setShowError] = useState(false);
    const [cityOptions, setCityOptions] = useState<string[]>([]);
    const [bankOptions, setBankOptions] = useState<string[]>([]);

    useEffect(() => {
        CityService.getCities().then(setCityOptions).catch(console.error);
        BankService.getBanks().then(setBankOptions).catch(console.error);
    }, []);

    useEffect(() => {
        const emailErrorsTemp: string[] = [];
        const passwordErrorsTemp: string[] = [];
        const confirmPasswordErrorsTemp: string[] = [];
        const phoneNumberErrorsTemp: string[] = [];
        const ribErrorsTemp: string[] = [];
        const cinErrorsTemp: string[] = [];
        const otpErrorsTemp: string[] = [];

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

        if (confirmPassword !== password) {
            confirmPasswordErrorsTemp.push("Passwords do not match");
        }

        if (!phoneNumber) {
            phoneNumberErrorsTemp.push("Phone number must not be entered blank");
        } else if (!validatePhoneNumber(phoneNumber)) {
            phoneNumberErrorsTemp.push("Invalid phone number format");
        }

        if (!rib) {
            ribErrorsTemp.push("RIB must not be entered blank");
        } else if (!validateRib(rib)) {
            ribErrorsTemp.push("RIB must be 24 digits long");
        }

        if (!cin) {
            cinErrorsTemp.push("CIN must not be entered blank");
        } else if (!validateCin(cin)) {
            cinErrorsTemp.push("CIN must be 8 characters long");
        }

        if (!otp) {
            otpErrorsTemp.push("OTP must not be entered blank");
        } else if (otp.length !== 6) {
            otpErrorsTemp.push("OTP must be 6 digits long");
        }

        setEmailErrors(emailErrorsTemp);
        setPasswordErrors(passwordErrorsTemp);
        setConfirmPasswordErrors(confirmPasswordErrorsTemp);
        setPhoneNumberErrors(phoneNumberErrorsTemp);
        setRibErrors(ribErrorsTemp);
        setCinErrors(cinErrorsTemp);
        setOtpErrors(otpErrorsTemp);

        setEmailValid(emailErrorsTemp.length === 0);
        setPasswordValid(passwordErrorsTemp.length === 0);
        setConfirmPasswordValid(confirmPasswordErrorsTemp.length === 0);
        setPhoneNumberValid(phoneNumberErrorsTemp.length === 0);
        setRibValid(ribErrorsTemp.length === 0);
        setCinValid(cinErrorsTemp.length === 0);
        setOtpValid(otpErrorsTemp.length === 0);
    }, [email, password, confirmPassword, phoneNumber, rib, cin, otp]);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            await RegisterService.register({
                email,
                password,
                firstName,
                lastName,
                city,
                phoneNumber,
                cin,
                bankName,
                rib,
            });
            toast.success('Registration successful');
            setTimeout(() => {
                navigate('/');
            }, 2000);
        } catch (error) {
            setErrorMessage(error as string);
        }
    };

    const handleRibKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        const charCode = event.charCode;
        if (charCode < 48 || charCode > 57) {
            event.preventDefault();
        }
    };

    const handleCinKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        const charCode = event.charCode;
        if ((charCode < 48 || charCode > 57) && (charCode < 65 || charCode > 90) && (charCode < 97 || charCode > 122)) {
            event.preventDefault();
        }
    };

    const handleOtpKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        const charCode = event.charCode;
        if (charCode < 48 || charCode > 57) {
            event.preventDefault();
        }
    };

    const handleNextStep = async () => {
        if (currentStep === 1 && firstName && lastName && city && phoneNumberValid && ribValid && cinValid) {
            setCurrentStep(2);
        } else if (currentStep === 2 && emailValid && passwordValid && confirmPasswordValid) {
            try {
                await OtpService.sendOtp(email);
                toast.success('OTP sent to your email');
                setCurrentStep(3);
            } catch (error) {
                setErrorMessage(error as string);
                setShowError(true);
                setTimeout(() => {
                    setShowError(false);
                    setErrorMessage('');
                }, 3000);
            }
        }
    };

    const handlePreviousStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-purple-600 p-4 sm:p-0">
            <div className="w-full max-w-4xl bg-white p-0 rounded shadow-lg flex">
                <div className="hidden md:flex w-1/2 bg-cover bg-center rounded-l" style={{ backgroundImage: `url(${designImage})` }}>
                    {/* Vous pouvez ajouter plus de contenu ici si nécessaire */}
                </div>
                <div className="w-full md:w-1/2 p-8">
                    <h2 className="text-center mb-6 text-xl font-bold">Register a new account</h2>
                    <StepIndicator currentStep={currentStep} />
                    <Form onSubmit={handleSubmit}>
                        {currentStep === 1 && (
                            <>
                                <ProfileForm
                                    firstName={firstName}
                                    lastName={lastName}
                                    city={city}
                                    phoneNumber={phoneNumber}
                                    cin={cin}
                                    bankName={bankName}
                                    rib={rib}
                                    setFirstName={setFirstName}
                                    setLastName={setLastName}
                                    setCity={setCity}
                                    setPhoneNumber={setPhoneNumber}
                                    setCin={setCin}
                                    setBankName={setBankName}
                                    setRib={setRib}
                                    handleRibKeyPress={handleRibKeyPress}
                                    handleCinKeyPress={handleCinKeyPress}
                                    ribValid={ribValid}
                                    ribErrors={ribErrors}
                                    phoneNumberValid={phoneNumberValid}
                                    phoneNumberErrors={phoneNumberErrors}
                                    cinValid={cinValid}
                                    cinErrors={cinErrors}
                                    cityOptions={cityOptions}
                                    bankOptions={bankOptions}
                                />
                                <Button variant="primary" className="w-full mt-4" onClick={handleNextStep} disabled={!phoneNumberValid || !ribValid || !cinValid}>
                                    Next
                                </Button>
                            </>
                        )}
                        {currentStep === 2 && (
                            <>
                                <AccountForm
                                    email={email}
                                    password={password}
                                    confirmPassword={confirmPassword}
                                    setEmail={setEmail}
                                    setPassword={setPassword}
                                    setConfirmPassword={setConfirmPassword}
                                    setEmailValid={setEmailValid}
                                    setEmailErrors={setEmailErrors}
                                    emailValid={emailValid}
                                    emailErrors={emailErrors}
                                    passwordValid={passwordValid}
                                    passwordErrors={passwordErrors}
                                    confirmPasswordValid={confirmPasswordValid}
                                    confirmPasswordErrors={confirmPasswordErrors}
                                />
                                {errorMessage && (
                                    <div className="text-red-500 text-center mb-3">{errorMessage}</div>
                                )}
                                <div className="d-flex justify-content-between mt-4">
                                    <Button variant="secondary" onClick={handlePreviousStep}>
                                        Back
                                    </Button>
                                    <Button variant="primary" onClick={handleNextStep} disabled={!emailValid || !passwordValid || !confirmPasswordValid}>
                                        Next
                                    </Button>
                                </div>
                            </>
                        )}
                        {currentStep === 3 && (
                            <>
                                <OtpVerificationForm
                                    otp={otp}
                                    setOtp={setOtp}
                                    otpValid={otpValid}
                                    otpErrors={otpErrors}
                                    handleOtpKeyPress={handleOtpKeyPress}
                                    email={email}
                                    clientData={{
                                        email,
                                        password,
                                        firstName,
                                        lastName,
                                        city,
                                        phoneNumber,
                                        cin,
                                        bankName,
                                        rib,
                                    }}
                                />
                                {showError && errorMessage && (
                                    <Alert variant="danger" className="text-center mb-3">
                                        {errorMessage}
                                    </Alert>
                                )}
                                <div className="d-flex justify-content-between mt-4">
                                    <Button variant="secondary" onClick={handlePreviousStep}>
                                        Back
                                    </Button>
                                    <Button variant="primary" onClick={handleNextStep} disabled={!otpValid}>
                                        Verify OTP
                                    </Button>
                                </div>
                            </>
                        )}
                    </Form>
                    <div className="text-center mt-3">
                        <span>Already have an account? </span>
                        <Link to="/" className="text-purple-600">Sign in</Link>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Register;
