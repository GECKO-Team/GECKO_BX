import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import {User_service} from "../data/user_service.js";

const result = dotenv.config();

export function createToken(user) {
    const payload = {
        user: user.username
    };
    const options = {
        algorithm: "HS256",
        expiresIn: "1d",
    };
    return jwt.sign(payload, process.env.cookie_password, options);
}

export function decodeToken(token) {
    const userInfo = {};
    try {
        const decoded = jwt.verify(token, process.env.cookie_password);
        userInfo.user = decoded.user;
    } catch (e) {
        console.log(e.message);
    }
    return userInfo;
}

export async function validate(decoded, request) {
    const user = await User_service.getUser(decoded.user);
    if (!user) {
        return { isValid: false };
    }
    return { isValid: true, credentials: user };
}