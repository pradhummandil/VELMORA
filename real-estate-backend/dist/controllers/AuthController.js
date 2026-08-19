"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.googleLogin = exports.login = exports.signup = void 0;
const User_1 = require("../models/User");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const getJwtSecret = () => {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error("JWT_SECRET environment variable is required");
    }
    return secret;
};
//📌 1️⃣ NEW USER SIGNUP 
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password, termsAccepted } = req.body;
        if (!name || !email || !password) {
            res.status(400).json({ error: "Name, email and password are required" });
            return;
        }
        if (!termsAccepted) {
            res.status(400).json({ error: "You must accept the terms and conditions" });
            return;
        }
        const existingUser = yield User_1.User.findOne({ where: { email } });
        if (existingUser) {
            res.status(400).json({ error: "User already exists" });
            return;
        }
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        const user = yield User_1.User.create({ name, email, password: hashedPassword, termsAccepted });
        res.status(201).json({
            message: "User created successfully!",
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        });
    }
    catch (error) {
        console.error("Signup Error:", error);
        res.status(500).json({ error: "Error creating user" });
    }
});
exports.signup = signup;
// 📌 2️⃣ Login 
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ error: "Email and password are required" });
            return;
        }
        // Search user
        const user = yield User_1.User.findOne({ where: { email } });
        if (!user) {
            res.status(401).json({ error: "Invalid credentials" });
            return;
        }
        // Check password
        const isPasswordValid = yield bcryptjs_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            res.status(401).json({ error: "Invalid credentials" });
            return;
        }
        // ✅ Create JWT
        const token = jsonwebtoken_1.default.sign({ id: user.id }, getJwtSecret(), { expiresIn: "7d" });
        res.json({
            message: "Login successful!",
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        });
    }
    catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ error: "Error logging in" });
    }
});
exports.login = login;
// 📌 3️⃣ Google OAuth Sign-In / Sign-Up
const googleLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { credential, email: directEmail, name: directName } = req.body;
        let email = directEmail;
        let name = directName;
        // If Google ID Token / credential is provided, decode payload
        if (credential) {
            try {
                const decoded = jsonwebtoken_1.default.decode(credential);
                if (decoded && decoded.email) {
                    email = decoded.email;
                    name = decoded.name || decoded.given_name || email.split("@")[0];
                }
            }
            catch (err) {
                console.error("Error decoding Google credential:", err);
            }
        }
        if (!email) {
            res.status(400).json({ error: "Valid Google account email is required" });
            return;
        }
        // Find or create user
        let user = yield User_1.User.findOne({ where: { email } });
        if (!user) {
            const randomPassword = yield bcryptjs_1.default.hash(Math.random().toString(36) + Date.now(), 10);
            user = yield User_1.User.create({
                name: name || email.split("@")[0],
                email,
                password: randomPassword,
                termsAccepted: true,
            });
        }
        // Issue VELMORA JWT
        const token = jsonwebtoken_1.default.sign({ id: user.id }, getJwtSecret(), { expiresIn: "7d" });
        res.json({
            message: "Google login successful!",
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
        });
    }
    catch (error) {
        console.error("Google Auth Error:", error);
        res.status(500).json({ error: "Error authenticating with Google" });
    }
});
exports.googleLogin = googleLogin;
