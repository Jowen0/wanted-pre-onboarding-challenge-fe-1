export type Token = string;

export type AuthInfo = {
    email: string,
    password: string,
};

export type AuthResult = {
    message: string,
    token: string,
};