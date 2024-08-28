import React from 'react';
import { Form } from 'react-bootstrap';
import { FaExclamationCircle } from 'react-icons/fa';

interface FormFieldProps {
    label: string;
    type: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    isValid: boolean;
    errorMessages: string[];
    placeholder: string;
    maxLength?: number;
}

const FormField: React.FC<FormFieldProps> = ({
                                                 label,
                                                 type,
                                                 value,
                                                 onChange,
                                                 onKeyPress,
                                                 isValid,
                                                 errorMessages,
                                                 placeholder,
                                                 maxLength,
                                             }) => {
    return (
        <Form.Group className="mb-3 relative">
            <Form.Label>{label}</Form.Label>
            {maxLength && (
                <div className="absolute top-0 right-0 text-muted">
                    {value.length}/{maxLength}
                </div>
            )}
            <div className="relative">
                <Form.Control
                    type={type}
                    value={value}
                    onChange={onChange}
                    onKeyPress={onKeyPress}
                    placeholder={placeholder}
                    maxLength={maxLength}
                    className={`p-2 w-full border rounded ${
                        value.length === 0 ? 'border-black' : isValid ? 'border-green-500' : 'border-red-500'
                    }`}
                />
                <div className="absolute top-1/2 right-3 transform -translate-y-1/2">
                    {value.length > 0 && !isValid && <FaExclamationCircle className="text-red-500" />}
                </div>
            </div>
            {!isValid && value.length > 0 && errorMessages.map((msg, index) => (
                <Form.Text key={index} className="text-red-500">{msg}</Form.Text>
            ))}
        </Form.Group>
    );
};

export default FormField;
