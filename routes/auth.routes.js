const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const { isAuthenticated } = require("../middlewares/route-guard.middleware");
const router = require("express").Router();

const prisma = new PrismaClient();

router.get("/", (req, res) => {
  res.json("All good in auth  :)");
});

// POST Signup
router.post("/signup", async (req, res, next) => {
  const { username, email, password, firstName, surname } = req.body;

  if (!username || !password || !email) {
    return res.status(400).json({ message: "Provide username, email, and password" });
  }

  try {
    const existingUser = await prisma.user.findUnique({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ message: "The username is already taken" });
    }
    const existingEmail = await prisma.user.findUnique({ where: { email } });
    if (existingEmail) {
      return res.status(400).json({ message: "The email is already taken" });
    }

    const salt = bcrypt.genSaltSync(13);
    const passwordHash = bcrypt.hashSync(password, salt);

    const newUser = await prisma.user.create({
      data: { username, email, passwordHash, firstName, surname },
    }, {omit: {password}});
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
});

// POST Login
router.post("/login", async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const potentialUser = await prisma.user.findUnique({ where: { username } });
    if (potentialUser) {
      if (bcrypt.compareSync(password, potentialUser.passwordHash)) {
        const payload = {
          userId: potentialUser.id,
          username: potentialUser.username,
        };
        const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
          algorithm: "HS256",
          expiresIn: "6h",
        });
        res.json({ token: authToken });
      } else {
        res.status(403).json({ message: "Incorrect password" });
      }
    } else {
      res.status(400).json({ message: "No user with this username" });
    }
  } catch (error) {
    next(error);
  }
});

// GET Verify
router.get("/verify", isAuthenticated, async (req, res, next) => {
  try {
    const currentUser = await prisma.user.findUnique({
      where: { id: req.tokenPayload.userId },
      select: { id: true, username: true, email: true, profilePicture: true },
    });
    res.json(currentUser);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
