import { Router, Request, Response } from "express";
import { User } from "../models/User"; 
import { authenticateUser, AuthRequest } from "../middleware/authMiddleware"; 

const router = Router();


router.get("/profile", authenticateUser, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const user = await User.findByPk(req.user.id, {
      attributes: ["name", "email", "firstName", "lastName", "phoneNumber", "about"]
    });

    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});


router.put("/profile", authenticateUser, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const { firstName, lastName, phoneNumber, about } = req.body;

    if (!firstName || !lastName || !phoneNumber || !about) {
      res.status(400).json({ error: "All fields are required" }); 
      return;
    }

    await User.update(
      { firstName, lastName, phoneNumber, about },
      { where: { id: req.user.id } }
    );

    res.json({ message: "Profile updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

export default router;
