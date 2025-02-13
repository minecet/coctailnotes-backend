const express = require("express");

const router = express.Router();
//const { isAuthenticated } = require("../middlewares/route-guard.middleware");

const prisma = require('../db/index');

// POST /api/notes
router.post("/", async (req, res) => {
    const { userId, cocktailId, content } = req.body;
    console.log("Received Data:", { userId, cocktailId, content }); // ✅ Debugging log

    if (!userId || !cocktailId || !content) {
      console.error("❌ Missing fields!", { userId, cocktailId, content });
      return res.status(400).json({ error: "Missing fields" });
    }

    try {
      const newNote = await prisma.note.create({
        data: {
          content,
          user: { connect: { id: userId } },
          cocktail: { connect: { id: Number(cocktailId) } },
        },
      });
      res.status(201).json(newNote);
    } catch (error) {
      console.error("❌ Error creating note:", error);
      res.status(500).json({ error: "Internal server error" });
    }
});

  // GET /api/notes/user/:userId
router.get("/user/:userId", async (req, res) => {
    const { userId } = req.params;
  
    try {
      const userNotes = await prisma.note.findMany({
        where: { userId },
        include: { cocktail: true },
      });
      res.json(userNotes);
    } catch (error) {
      console.error("Error fetching user notes:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  
  // PUT /api/notes/:noteId
router.put("/:noteId", async (req, res) => {
    const { noteId } = req.params;
    const { content } = req.body;
  
    try {
      const updatedNote = await prisma.note.update({
        where: { id: noteId },
        data: { content },
      });
      res.json(updatedNote);
    } catch (error) {
      console.error("Error updating note:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  
  // DELETE /api/notes/:noteId
router.delete("/:noteId", async (req, res) => {
    const { noteId } = req.params;
  
    try {
      await prisma.note.delete({
        where: { id: noteId },
      });
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting note:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  
  module.exports = router
