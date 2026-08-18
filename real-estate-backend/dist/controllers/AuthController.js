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
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const SECRET_KEY = process.env.JWT_SECRET || "secret_key";
//📌 1️⃣ NEW USER  SIGNUP 
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password, termsAccepted } = req.body;
        console.log("Received Data:", req.body);
        if (!termsAccepted) {
            res.status(400).json({ error: "You must accept the terms and conditions" });
            return;
        }
        const existingUser = yield User_1.User.findOne({ where: { email } });
        if (existingUser) {
            res.status(400).json({ error: "User already exists" });
            return;
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const user = yield User_1.User.create({ name, email, password: hashedPassword, termsAccepted });
        res.status(201).json({ message: "User created successfully!", user });
    }
    catch (error) {
        console.error("Signup Error:", error);
        res.status(500).json({ error: "Error creating user", details: error });
    }
});
exports.signup = signup;
// 📌 2️⃣ Login 
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        // Search new user
        const user = yield User_1.User.findOne({ where: { email } });
        if (!user) {
            res.status(401).json({ error: "Invalid credentials" });
            return;
        }
        // Check password
        const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            res.status(401).json({ error: "Invalid credentials" });
            return;
        }
        // ✅ Create JWT
        const token = jsonwebtoken_1.default.sign({ id: user.id }, "your_secret_key", { expiresIn: "1h" });
        res.json({ message: "Login successful!", token });
    }
    catch (error) {
        res.status(500).json({ error: "Error logging in" });
    }
});
exports.login = login;
