import React, { useState, useEffect, useRef } from 'react';
import { Row, Col, Form, Spinner } from 'react-bootstrap';
import FormField from './FormField';
import RegisterService from '../services/RegisterService';

interface AccountFormProps {
    email: string;
    password: string;
    confirmPassword: string;
    setEmail: (value: string) => void;
    setPassword: (value: string) => void;
    setConfirmPassword: (value: string) => void;
    emailValid: boolean;
    setEmailValid: (value: boolean) => void;
    emailErrors: string[];
    setEmailErrors: (errors: string[]) => void;
    passwordValid: boolean;
    passwordErrors: string[];
    confirmPasswordValid: boolean;
    confirmPasswordErrors: string[];
}

const AccountForm: React.FC<AccountFormProps> = ({
                                                     email,
                                                     password,
                                                     confirmPassword,
                                                     setEmail,
                                                     setPassword,
                                                     setConfirmPassword,
                                                     emailValid,
                                                     setEmailValid,
                                                     emailErrors,
                                                     setEmailErrors,
                                                     passwordValid,
                                                     passwordErrors,
                                                     confirmPasswordValid,
                                                     confirmPasswordErrors,
                                                 }) => {
    const [isCheckingEmail, setIsCheckingEmail] = useState(false);
    const emailRef = useRef<any>(null);
    const [isTyping, setIsTyping] = useState(false);

    useEffect(() => {
        const checkEmail = async () => {
            if (email) {
                setIsCheckingEmail(true);
                try {
                    await RegisterService.verifyEmail(email);
                    setEmailValid(true);
                    setEmailErrors([]);
                } catch (error) {
                    if (typeof error === 'string') {
                        setEmailErrors([error]);
                    } else if (error instanceof Error) {
                        setEmailErrors([error.message]);
                    } else {
                        setEmailErrors(['Unknown error occurred']);
                    }
                    setEmailValid(false);
                } finally {
                    setIsCheckingEmail(false);
                }
            }
        };

        const delayDebounceFn = setTimeout(() => {
            if (!isTyping) {
                checkEmail();
            }
        }, 1000); // 1000ms debounce

        return () => clearTimeout(delayDebounceFn);
    }, [email, isTyping, setEmailValid, setEmailErrors]);

    return (
        <Form>
            <Row>
                <Col xs={12}>
                    <FormField
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            setIsTyping(true);
                            if (emailRef.current) {
                                clearTimeout(emailRef.current);
                            }
                            emailRef.current = setTimeout(() => {
                                setIsTyping(false);
                            }, 500); // Stop typing after 500ms
                        }}
                        isValid={emailValid}
                        errorMessages={emailErrors}
                        placeholder="Email Address"
                    />
                    {isCheckingEmail && <Spinner animation="border" size="sm" />}
                </Col>
            </Row>
            <Row>
                <Col xs={12} md={6}>
                    <FormField
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        isValid={passwordValid}
                        errorMessages={passwordErrors}
                        placeholder="Password"
                    />
                </Col>
                <Col xs={12} md={6}>
                    <FormField
                        label="Confirm Password"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        isValid={confirmPasswordValid}
                        errorMessages={confirmPasswordErrors}
                        placeholder="Confirm Password"
                    />
                </Col>
            </Row>
        </Form>
    );
};

export default AccountForm;
