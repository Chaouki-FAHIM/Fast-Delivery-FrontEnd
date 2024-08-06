// src/components/PasswordResetForm.tsx

import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import FormField from './FormField';
import { validateLoginEmail, validatePhoneNumber } from '../utils/validators';

interface PasswordResetFormProps {
    onSubmit: (email: string, phoneNumber: string) => void;
}

const PasswordResetForm: React.FC<PasswordResetFormProps> = ({ onSubmit }) => {
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [emailValid, setEmailValid] = useState(false);
    const [phoneNumberValid, setPhoneNumberValid] = useState(false);
    const [emailErrors, setEmailErrors] = useState<string[]>([]);
    const [phoneNumberErrors, setPhoneNumberErrors] = useState<string[]>([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [showError, setShowError] = useState(false);

    const handlePhoneNumberKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        const charCode = event.charCode;
        if (charCode < 48 || charCode > 57) {
            event.preventDefault();
        }
    };

    const handleValidation = () => {
        const emailErrorsTemp: string[] = [];
        const phoneNumberErrorsTemp: string[] = [];

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

        setEmailErrors(emailErrorsTemp);
        setPhoneNumberErrors(phoneNumberErrorsTemp);
        setEmailValid(emailErrorsTemp.length === 0);
        setPhoneNumberValid(phoneNumberErrorsTemp.length === 0);

        return emailErrorsTemp.length === 0 && phoneNumberErrorsTemp.length === 0;
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (handleValidation()) {
            onSubmit(email, phoneNumber);
        } else {
            setShowError(true);
            setTimeout(() => {
                setShowError(false);
                setErrorMessage('');
            }, 3000);
        }
    };

    return (
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
            <Button
                variant="primary"
                type="submit"
                className="w-full mt-4"
                disabled={!emailValid || !phoneNumberValid}
            >
                Send OTP
            </Button>
        </Form>
    );
};

export default PasswordResetForm;
