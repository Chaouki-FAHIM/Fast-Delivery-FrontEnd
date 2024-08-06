import React from 'react';
import FormField from './FormField';

interface ResetPasswordFormProps {
    newPassword: string;
    confirmPassword: string;
    setNewPassword: (value: string) => void;
    setConfirmPassword: (value: string) => void;
    newPasswordValid: boolean;
    confirmPasswordValid: boolean;
    newPasswordErrors: string[];
    confirmPasswordErrors: string[];
}

const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({
                                                                 newPassword,
                                                                 confirmPassword,
                                                                 setNewPassword,
                                                                 setConfirmPassword,
                                                                 newPasswordValid,
                                                                 confirmPasswordValid,
                                                                 newPasswordErrors,
                                                                 confirmPasswordErrors
                                                             }) => {
    return (
        <>
            <FormField
                label="New Password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                isValid={newPasswordValid}
                errorMessages={newPasswordErrors}
                placeholder="New Password"
            />
            <FormField
                label="Confirm Password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                isValid={confirmPasswordValid}
                errorMessages={confirmPasswordErrors}
                placeholder="Confirm Password"
            />
        </>
    );
};

export default ResetPasswordForm;
