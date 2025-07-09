import { ValidationChain } from 'express-validator';
export declare class UserValidator {
    static createUser(): ValidationChain[];
    static updateUser(): ValidationChain[];
    static getUserById(): ValidationChain[];
    static assignPermissions(): ValidationChain[];
}
