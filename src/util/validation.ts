export const validateEmail = (email: string) => {

    let isEmail = true;
    const emailReg = /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]{2,3}$/;

    if (email === "" || !emailReg.test(email)) isEmail = false;

    return isEmail;
};

export const validatePassword = (password: string) => {

    let isPassword = true;
    if (password === "" || password.length < 8) isPassword = false;

    return isPassword;
};