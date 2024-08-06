import React from 'react';
import { Row, Col, Form } from 'react-bootstrap';
import FormField from './FormField';

interface AccountFormProps {
    email: string;
    password: string;
    confirmPassword: string;
    setEmail: (value: string) => void;
    setPassword: (value: string) => void;
    setConfirmPassword: (value: string) => void;
    emailValid: boolean;
    emailErrors: string[];
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
                                                     emailErrors,
                                                     passwordValid,
                                                     passwordErrors,
                                                     confirmPasswordValid,
                                                     confirmPasswordErrors,
                                                 }) => {
    return (
        <Form>
            <Row>
                <Col xs={12}>
                    <FormField
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        isValid={emailValid}
                        errorMessages={emailErrors}
                        placeholder="Email Address"
                    />
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
