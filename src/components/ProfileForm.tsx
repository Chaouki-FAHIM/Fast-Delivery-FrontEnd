import React from 'react';
import { Row, Col } from 'react-bootstrap';
import FormField from './FormField';
import SelectField from './SelectField';

interface ProfileFormProps {
    firstName: string;
    lastName: string;
    city: string;
    phoneNumber: string;
    cin: string;
    bankName: string;
    rib: string;
    setFirstName: (value: string) => void;
    setLastName: (value: string) => void;
    setCity: (value: string) => void;
    setPhoneNumber: (value: string) => void;
    setCin: (value: string) => void;
    setBankName: (value: string) => void;
    setRib: (value: string) => void;
    handleRibKeyPress: (event: React.KeyboardEvent<HTMLInputElement>) => void;
    handleCinKeyPress: (event: React.KeyboardEvent<HTMLInputElement>) => void;
    ribValid: boolean;
    ribErrors: string[];
    phoneNumberValid: boolean;
    phoneNumberErrors: string[];
    cinValid: boolean;
    cinErrors: string[];
    cityOptions: string[];
    bankOptions: string[];
}

const ProfileForm: React.FC<ProfileFormProps> = ({
                                                     firstName,
                                                     lastName,
                                                     city,
                                                     phoneNumber,
                                                     cin,
                                                     bankName,
                                                     rib,
                                                     setFirstName,
                                                     setLastName,
                                                     setCity,
                                                     setPhoneNumber,
                                                     setCin,
                                                     setBankName,
                                                     setRib,
                                                     handleRibKeyPress,
                                                     handleCinKeyPress,
                                                     ribValid,
                                                     ribErrors,
                                                     phoneNumberValid,
                                                     phoneNumberErrors,
                                                     cinValid,
                                                     cinErrors,
                                                     cityOptions,
                                                     bankOptions,
                                                 }) => {
    return (
        <>
            <Row>
                <Col xs={12} md={6}>
                    <FormField
                        label="First Name"
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        isValid={firstName.length > 0}
                        errorMessages={[]}
                        placeholder="First Name"
                    />
                </Col>
                <Col xs={12} md={6}>
                    <FormField
                        label="Last Name"
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        isValid={lastName.length > 0}
                        errorMessages={[]}
                        placeholder="Last Name"
                    />
                </Col>
            </Row>
            <Row>
                <Col xs={12} md={6}>
                    <SelectField
                        label="City"
                        value={city}
                        options={cityOptions.map(city => ({ value: city, label: city }))}
                        onChange={(value) => setCity(value)}
                        isValid={city.length > 0}
                        errorMessages={[]}
                        placeholder="Select a city"
                    />
                </Col>
                <Col xs={12} md={6}>
                    <FormField
                        label="Phone Number"
                        type="text"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        onKeyPress={handleRibKeyPress}
                        isValid={phoneNumberValid}
                        errorMessages={phoneNumberErrors}
                        placeholder="Phone Number"
                        maxLength={10}
                    />
                </Col>
            </Row>
            <Row>
                <Col xs={12} md={6}>
                    <FormField
                        label="CIN"
                        type="text"
                        value={cin}
                        onChange={(e) => {
                            if (e.target.value.length <= 8) {
                                setCin(e.target.value);
                            }
                        }}
                        onKeyPress={handleCinKeyPress}
                        isValid={cinValid}
                        errorMessages={cinErrors}
                        placeholder="CIN"
                        maxLength={8}
                    />
                </Col>
                <Col xs={12} md={6}>
                    <SelectField
                        label="Bank Name"
                        value={bankName}
                        options={bankOptions.map(bank => ({ value: bank, label: bank }))}
                        onChange={(value) => setBankName(value)}
                        isValid={bankName.length > 0}
                        errorMessages={[]}
                        placeholder="Select a bank"
                    />
                </Col>
            </Row>
            <Row>
                <Col xs={12}>
                    <FormField
                        label="RIB"
                        type="text"
                        value={rib}
                        onChange={(e) => {
                            if (e.target.value.length <= 24) {
                                setRib(e.target.value);
                            }
                        }}
                        onKeyPress={handleRibKeyPress}
                        isValid={ribValid}
                        errorMessages={ribErrors}
                        placeholder="RIB"
                        maxLength={24}
                    />
                </Col>
            </Row>
        </>
    );
};

export default ProfileForm;
