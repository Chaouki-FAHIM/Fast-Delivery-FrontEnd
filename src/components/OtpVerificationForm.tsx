import React from 'react';
import { Form } from 'react-bootstrap';

interface OtpVerificationFormProps {
    otp: string;
    setOtp: (value: string) => void;
    otpValid: boolean;
    otpErrors: string[];
    handleOtpKeyPress: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

const OtpVerificationForm: React.FC<OtpVerificationFormProps> = ({
                                                                     otp,
                                                                     setOtp,
                                                                     otpValid,
                                                                     otpErrors,
                                                                     handleOtpKeyPress,
                                                                 }) => {
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
                {!otpValid && otp.length > 0 && otpErrors.map((msg, index) => (
                    <Form.Text key={index} className="text-red-500">{msg}</Form.Text>
                ))}
            </Form.Group>
        </>
    );
};

export default OtpVerificationForm;
