export const emailValidator = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
        return "Email is required";
    }
    if (!emailRegex.test(email)) {
        return "Invalid email address";
    }
    return '';
};

export const numberValidator = (number) => {
    const phoneRegex = /^[0-9]+$/;
    if (!number) {
        return " number is required";
    }
    if (!phoneRegex.test(number)) {
        return "must contain only numbers";
    }
    return '';
};