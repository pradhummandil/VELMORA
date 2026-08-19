import { Request, Response } from "express";
import { User } from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET || "velmora_luxury_realestate_jwt_secret_dev_only";

//📌 1️⃣ NEW USER SIGNUP 
export const signup = async (req: Request, res: Response): Promise<void> => {
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

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      res.status(400).json({ error: "User already exists" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ name, email, password: hashedPassword, termsAccepted });

    res.status(201).json({ 
      message: "User created successfully!", 
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    console.error("Signup Error:", error); 
    res.status(500).json({ error: "Error creating user" });
  }
};
  

// 📌 2️⃣ Login 
export const login = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        res.status(400).json({ error: "Email and password are required" });
        return;
      }
  
      // Search user
      const user = await User.findOne({ where: { email } });
      if (!user) {
        res.status(401).json({ error: "Invalid credentials" });
        return;
      }
  
      // Check password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        res.status(401).json({ error: "Invalid credentials" });
        return;
      }
  
      // ✅ Create JWT
      const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: "7d" });
  
      res.json({ 
        message: "Login successful!", 
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email
        }
      });
    } catch (error) {
      console.error("Login Error:", error);
      res.status(500).json({ error: "Error logging in" });
    }
  };
  
