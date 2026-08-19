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
exports.login = exports.signup = void 0;
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
