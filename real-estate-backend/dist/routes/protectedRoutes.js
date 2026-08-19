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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const sequelize_1 = require("sequelize");
const User_1 = require("../models/User");
const Property_1 = require("../models/Property");
const Inquiry_1 = require("../models/Inquiry");
const ViewingRequest_1 = require("../models/ViewingRequest");
const Favorite_1 = require("../models/Favorite");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = (0, express_1.Router)();
// 📌 GET PROFILE
router.get("/profile", authMiddleware_1.authenticateUser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user) {
            res.status(401).json({ error: "Unauthorized" });
            return;
        }
        const user = yield User_1.User.findByPk(req.user.id, {
            attributes: ["id", "name", "email", "role", "firstName", "lastName", "phoneNumber", "about"],
        });
        if (!user) {
            res.status(404).json({ error: "User not found" });
            return;
        }
        const userObj = user.toJSON();
        if (!userObj.role) {
            userObj.role = "user";
        }
        res.json(userObj);
    }
    catch (error) {
        console.error("Profile Fetch Error:", error);
        res.status(500).json({ error: "Something went wrong fetching profile" });
    }
}));
// 📌 UPDATE PROFILE
router.put("/profile", authMiddleware_1.authenticateUser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user) {
            res.status(401).json({ error: "Unauthorized" });
            return;
        }
        const { name, firstName, lastName, phoneNumber, about } = req.body;
        const updateData = {};
        if (name !== undefined)
            updateData.name = name;
        if (firstName !== undefined)
            updateData.firstName = firstName;
        if (lastName !== undefined)
            updateData.lastName = lastName;
        if (phoneNumber !== undefined)
            updateData.phoneNumber = phoneNumber;
        if (about !== undefined)
            updateData.about = about;
        yield User_1.User.update(updateData, { where: { id: req.user.id } });
        const updatedUser = yield User_1.User.findByPk(req.user.id, {
            attributes: ["id", "name", "email", "role", "firstName", "lastName", "phoneNumber", "about"],
        });
        res.json({ message: "Profile updated successfully", user: updatedUser });
    }
    catch (error) {
        console.error("Profile Update Error:", error);
        res.status(500).json({ error: "Something went wrong updating profile" });
    }
}));
// 📌 DASHBOARD REAL STATS
router.get("/dashboard/stats", authMiddleware_1.authenticateUser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user) {
            res.status(401).json({ error: "Unauthorized" });
            return;
        }
        const userId = req.user.id;
        const user = yield User_1.User.findByPk(userId);
        const role = (user === null || user === void 0 ? void 0 : user.role) || "user";
        // 1. Properties count
        let myPropertiesCount = 0;
        if (role === "property_owner") {
            myPropertiesCount = yield Property_1.Property.count({ where: { ownerId: userId } });
        }
        else if (role === "agent") {
            myPropertiesCount = yield Property_1.Property.count({
                where: {
                    [sequelize_1.Op.or]: [{ ownerId: userId }, { agentId: userId }],
                },
            });
        }
        else {
            myPropertiesCount = yield Property_1.Property.count({ where: { ownerId: userId } });
        }
        // 2. Inquiries count
        let activeInquiriesCount = 0;
        if (role === "user") {
            activeInquiriesCount = yield Inquiry_1.Inquiry.count({ where: { userId } });
        }
        else if (role === "property_owner") {
            activeInquiriesCount = yield Inquiry_1.Inquiry.count({ where: { ownerId: userId } });
        }
        else if (role === "agent") {
            activeInquiriesCount = yield Inquiry_1.Inquiry.count({
                where: {
                    [sequelize_1.Op.or]: [{ ownerId: userId }, { agentId: userId }],
                },
            });
        }
        // 3. Viewing Requests / Tours count
        let scheduledToursCount = 0;
        if (role === "user") {
            scheduledToursCount = yield ViewingRequest_1.ViewingRequest.count({ where: { userId } });
        }
        else if (role === "property_owner") {
            scheduledToursCount = yield ViewingRequest_1.ViewingRequest.count({ where: { ownerId: userId } });
        }
        else if (role === "agent") {
            scheduledToursCount = yield ViewingRequest_1.ViewingRequest.count({
                where: {
                    [sequelize_1.Op.or]: [{ ownerId: userId }, { agentId: userId }],
                },
            });
        }
        // 4. Saved Favorites count
        const savedFavouritesCount = yield Favorite_1.Favorite.count({ where: { userId } });
        res.json({
            role,
            myProperties: myPropertiesCount,
            activeInquiries: activeInquiriesCount,
            scheduledTours: scheduledToursCount,
            savedFavourites: savedFavouritesCount,
            portfolioViews: 0,
        });
    }
    catch (error) {
        console.error("Dashboard Stats Error:", error);
        res.status(500).json({ error: "Error fetching dashboard statistics" });
    }
}));
exports.default = router;
