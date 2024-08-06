import React from 'react';
import { Form } from 'react-bootstrap';

interface SelectFieldProps {
    label: string;
    value: string;
    options: string[];
    onChange: (value: string) => void;
    placeholder?: string;
    isValid: boolean;
    errorMessages: string[];
}

const SelectField: React.FC<SelectFieldProps> = ({
                                                     label,
                                                     value,
                                                     options,
                                                     onChange,
                                                     placeholder,
                                                     isValid,
                                                     errorMessages,
                                                 }) => {
    return (
        <Form.Group className="mb-3">
            <Form.Label>{label}</Form.Label>
            <Form.Control
                as="select"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className={`p-2 w-full border rounded ${value.length === 0 ? 'border-black' : isValid ? 'border-green-500' : 'border-red-500'}`}
            >
                <option value="">{placeholder}</option>
                {options.map((option, index) => (
                    <option key={index} value={option}>
                        {option}
                    </option>
                ))}
            </Form.Control>
            {!isValid && value.length > 0 && errorMessages.map((msg, index) => (
                <Form.Text key={index} className="text-red-500">{msg}</Form.Text>
            ))}
        </Form.Group>
    );
};

export default SelectField;
