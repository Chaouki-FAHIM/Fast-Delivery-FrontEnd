export const validateLoginEmail = (email: string): boolean => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
};

export const validateLoginPassword = (password: string): boolean => {
    return password.length >= 8;
};

export const validatePhoneNumber = (phone: string): boolean => {
    const re = /^(05|06|07)\d{8}$/;
    return re.test(phone);
};

export const validateRib = (rib: string): boolean => {
    const re = /^\d{24}$/;
    return re.test(rib);
};

export const validateCin = (cin: string): boolean => {
    return cin.length === 8;
};
