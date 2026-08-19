import { Request, Response } from "express";
import { User } from "../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const getJwtSecret = (): string => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET environment variable is required");
  }
  return secret;
};

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
      const token = jwt.sign({ id: user.id }, getJwtSecret(), { expiresIn: "7d" });
  
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
  

// 📌 3️⃣ Google OAuth Sign-In / Sign-Up
export const googleLogin = async (req: Request, res: Response): Promise<void> => {
  try {
    const { credential, email: directEmail, name: directName } = req.body;

    let email = directEmail;
    let name = directName;

    // If Google ID Token / credential is provided, decode payload
    if (credential) {
      try {
        const decoded = jwt.decode(credential) as any;
        if (decoded && decoded.email) {
          email = decoded.email;
          name = decoded.name || decoded.given_name || email.split("@")[0];
        }
      } catch (err) {
        console.error("Error decoding Google credential:", err);
      }
    }

    if (!email) {
      res.status(400).json({ error: "Valid Google account email is required" });
      return;
    }

    // Find or create user
    let user = await User.findOne({ where: { email } });
    if (!user) {
      const randomPassword = await bcrypt.hash(Math.random().toString(36) + Date.now(), 10);
      user = await User.create({
        name: name || email.split("@")[0],
        email,
        password: randomPassword,
        termsAccepted: true,
      });
    }

    // Issue VELMORA JWT
    const token = jwt.sign({ id: user.id }, getJwtSecret(), { expiresIn: "7d" });

    res.json({
      message: "Google login successful!",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Google Auth Error:", error);
    res.status(500).json({ error: "Error authenticating with Google" });
  }
};

