const { isAuthenticated } = require("../middlewares/route-guard.middleware");
//const fileUploader = require("../config/cloudinary.config");
const express = require('express');
const router = express.Router();

const prisma = require('../db/index');

router.get("/", async (req, res, next) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        email: true,
        profilePicture: true,
      },
    });
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
});

router.get("/profile", isAuthenticated, async (req, res, next) => {
  const userId = req.tokenPayload.userId;
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        username: true,
        email: true,
        profilePicture: true,
      },
    });
    user ? res.status(200).json(user) : res.status(404).json({ message: "User not found" });
  } catch (error) {
    next(error);
  }
});

router.get("/myblogs", isAuthenticated, async (req, res, next) => {
  const userId = req.tokenPayload.userId;
  try {
    const blogs = await prisma.blog.findMany({
      where: { userId },
      include: {
        user: {
          select: { username: true, profilePicture: true },
        },
      },
    });
    res.status(200).json(blogs);
  } catch (error) {
    next(error);
  }
});

router.get("/mycomments", isAuthenticated, async (req, res, next) => {
  const userId = req.tokenPayload.userId;
  try {
    const comments = await prisma.comment.findMany({
      where: { userId },
      include: {
        blogPost: {
          select: {
            title: true,
            textContent: true,
            mediaContent: true,
            createdAt: true,
            user: { select: { username: true, profilePicture: true } },
          },
        },
        user: { select: { username: true, profilePicture: true } },
      },
    });
    res.status(200).json(comments);
  } catch (error) {
    next(error);
  }
});

router.put("/profile", isAuthenticated, async (req, res, next) => {
  const userId = req.tokenPayload.userId;
  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: req.body,
      select: {
        id: true,
        username: true,
        email: true,
        profilePicture: true,
      },
    });
    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
});

router.post(
  "/profilePicture",
  isAuthenticated,
  //fileUploader.single("imageUrl"),
  async (req, res, next) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded!" });
      }

      const userId = req.tokenPayload.userId;
      const imageUrl = req.file.path;

      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: { profilePicture: imageUrl },
        select: { profilePicture: true },
      });

      res.status(200).json({
        profileImageUrl: updatedUser.profilePicture,
        message: "Profile picture updated!",
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
