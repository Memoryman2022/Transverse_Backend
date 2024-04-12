const express = require("express");
const router = express.Router();
const User = require("../models/User.model");
const mongoose = require("mongoose");
const { authenticateToken } = require("../middleware/authenticateToken");
const { AppError } = require("../middleware/error-handling");

// Find user (protected)
router.get("/protected/user", authenticateToken, async (req, res, next) => {
  try {
    const userId = req.payload.userId;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw new AppError("Invalid user ID", 400);
    }

    const user = await User.findById(userId);

    if (!user) {
      throw new AppError("User not found", 404);
    }

    const {
      _id,
      email,
      userName,
      spokenLanguages,
      hostedLanguages,
      profileImage,
    } = user;

    res.status(200).json({
      _id,
      email,
      userName,
      spokenLanguages,
      hostedLanguages,
      profileImage,
    });
  } catch (error) {
    next(error);
  }
});

// Update user (protected)
router.put(
  "/protected/user-update",
  authenticateToken,
  async (req, res, next) => {
    try {
      const userId = req.payload.userId;

      const updateData = {
        userName: req.body.userName,
        location: req.body.location,
        profileImage: req.body.profileImage,
      };

      if (req.body.spokenLanguages) {
        updateData.spokenLanguages = req.body.spokenLanguages
          .split(",")
          .map((lang) => lang.trim());
      }

      if (req.body.hostedLanguages) {
        updateData.hostedLanguages = req.body.hostedLanguages
          .split(",")
          .map((lang) => lang.trim());
      }

      const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
        new: true,
      });

      if (!updatedUser) {
        throw new AppError("User not found", 404);
      }

      if (!updatedUser) {
        throw new AppError("User not found", 404);
      }

      res.status(200).json({ message: "User updated", updatedUser });
    } catch (error) {
      next(error);
    }
  }
);

// Delete user (protected)
router.delete("/protected/user", authenticateToken, async (req, res, next) => {
  try {
    const userId = req.payload.userId;
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      throw new AppError("Could not delete user", 404);
    }

    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

module.exports = router;

// Update user (protected)
router.put(
  "/protected/user-update",
  authenticateToken,
  async (req, res, next) => {
    try {
      const userId = req.payload.userId;

      const updateData = {
        userName: req.body.userName,
        location: req.body.location,
        profileImage: req.body.profileImage,
      };

      if (req.body.spokenLanguages) {
        updateData.spokenLanguages = req.body.spokenLanguages
          .split(",")
          .map((lang) => lang.trim());
      }

      if (req.body.hostedLanguages) {
        updateData.hostedLanguages = req.body.hostedLanguages
          .split(",")
          .map((lang) => lang.trim());
      }

      const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
        new: true,
      });

      if (!updatedUser) {
        throw new AppError("User not found", 404);
      }

      if (!updatedUser) {
        throw new AppError("User not found", 404);
      }

      res.status(200).json({ message: "User updated", updatedUser });
    } catch (error) {
      next(error);
    }
  }
);

// Delete user (protected)
router.delete("/protected/user", authenticateToken, async (req, res, next) => {
  try {
    const userId = req.payload.userId;
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      throw new AppError("Could not delete user", 404);
    }

    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
