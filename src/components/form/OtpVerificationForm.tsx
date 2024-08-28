import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import APIClient from "../../services/APIClient";
import RegisterService from "../../services/RegisterService";

interface OtpVerificationFormProps {
    otp: string;
    setOtp: (value: string) => void;
    otpValid: boolean;
    otpErrors: string[];
    handleOtpKeyPress: (event: React.KeyboardEvent<HTMLInputElement>) => void;
    email: string;
    clientData: any;
}

const OtpVerificationForm: React.FC<OtpVerificationFormProps> = ({
                                                                     otp,
                                                                     setOtp,
                                                                     otpValid,
                                                                     otpErrors,
                                                                     handleOtpKeyPress,
                                                                     email,
                                                                     clientData
                                                                 }) => {
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [showError, setShowError] = useState<boolean>(false);

    const handleVerifyOtp = async () => {
        try {
            const response = await APIClient.post('/api/auth/verifyOtp', null, {
                params: { email, otp },
            });
            if (response.status === 200) {
                await RegisterService.register(clientData);
                toast.success('Registration successful');
            }
        } catch (error: any) {
            if (error.response && error.response.status === 400) {
                setErrorMessage(error.response.data);
            } else {
                console.error(error.message);
                setErrorMessage('Problem in server');
            }
            setShowError(true);
            setTimeout(() => {
                setShowError(false);
                setErrorMessage('');
            }, 3000);
        }
    };

    return (
        <>
            <Form.Group className="mb-3">
                <Form.Label>OTP</Form.Label>
                <Form.Control
                    type="text"
                    value={otp}
                    onChange={(e) => {
                        if (e.target.value.length <= 6) {
                            setOtp(e.target.value);
                        }
                    }}
                    onKeyPress={handleOtpKeyPress}
                    placeholder="Enter OTP"
                    className={`p-2 w-full border rounded ${otp.length === 0 ? 'border-black' : otpValid ? 'border-green-500' : 'border-red-500'}`}
                    maxLength={6}
                />
                {!otpValid && otp.length > 0 && otpErrors.map((msg: string, index: number) => (
                    <Form.Text key={index} className="text-red-500">{msg}</Form.Text>
                ))}
            </Form.Group>
            <Button variant="primary" onClick={handleVerifyOtp} disabled={!otpValid}>
                Verify OTP
            </Button>
            {showError && (
                <Alert variant="danger" className="text-center mt-3">
                    {errorMessage}
                </Alert>
            )}
            <ToastContainer />
        </>
    );
};

export default OtpVerificationForm;
