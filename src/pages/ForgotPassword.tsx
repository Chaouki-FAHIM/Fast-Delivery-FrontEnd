import React, { useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import OtpVerificationForm from '../components/OtpVerificationForm';
import APIClient from "../services/APIClient";
import RegisterService from "../services/RegisterService";

interface ClientData {
    email: string;
    // Add other properties as needed
}

const ForgotPassword = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [otpValid, setOtpValid] = useState(false);
    const [otpErrors, setOtpErrors] = useState<string[]>([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [showError, setShowError] = useState(false);
    const [clientData, setClientData] = useState<ClientData | null>(null);

    const handleOtpKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        const charCode = event.charCode;
        if (charCode < 48 || charCode > 57) {
            event.preventDefault();
        }
    };

    useEffect(() => {
        // Assuming you have logic to set the clientData based on some API call or input
        setClientData({
            email: 'example@example.com',
            // other client data
        });
    }, []);

    const handleNextStep = async () => {
        if (currentStep === 1) {
            try {
                await APIClient.post('/api/auth/sendOtp', null, {
                    params: { email },
                });
                setCurrentStep(2);
                toast.success(`OTP sent to email: ${email}`);
            } catch (error) {
                console.error(error);
                setErrorMessage('Failed to send OTP');
                setShowError(true);
                setTimeout(() => {
                    setShowError(false);
                    setErrorMessage('');
                }, 3000);
            }
        } else if (currentStep === 2) {
            // Handle OTP verification and proceed to the next step
            try {
                await APIClient.post('/api/auth/verifyOtp', null, {
                    params: { email, otp },
                });
                if (clientData) {
                    await RegisterService.register(clientData);
                    toast.success('Registration successful');
                }
            } catch (error) {
                console.error(error);
                setErrorMessage('Failed to verify OTP');
                setShowError(true);
                setTimeout(() => {
                    setShowError(false);
                    setErrorMessage('');
                }, 3000);
            }
        }
    };

    return (
        <div>
            {currentStep === 1 && (
                <>
                    <Form.Group controlId="formEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>
                    <Button variant="primary" onClick={handleNextStep}>
                        Next
                    </Button>
                    {showError && (
                        <Alert variant="danger" className="text-center mt-3">
                            {errorMessage}
                        </Alert>
                    )}
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
                        email={email} // Pass the email prop
                        clientData={clientData} // Pass the clientData prop
                    />
                    {showError && (
                        <Alert variant="danger" className="text-center mt-3">
                            {errorMessage}
                        </Alert>
                    )}
                </>
            )}
            <ToastContainer /> {/* Add this container for toasts */}
        </div>
    );
};

export default ForgotPassword;
