const express = require("express");

const router = express.Router();
//const { isAuthenticated } = require("../middlewares/route-guard.middleware");

const prisma = require('../db/index');

router.get("/", async (req, res) => {
    const query = req.query.query?.toString().toLowerCase() || "";
  
    try {
      const matchingCocktails = await prisma.cocktail.findMany({
        where: {
          common_name: {
            contains: query, // Case-insensitive search
            mode: "insensitive", // Works for PostgreSQL
          },
        },
      });
  
      res.status(200).json(matchingCocktails);
    } catch (error) {
      console.error("Error fetching plant species:", error);
      res.status(500).send("Internal server error");
    }
  });
  
  router.get("/random", async (req, res) => {
    const limit = parseInt(req.query.limit) || 5;
  
    try {
      const cocktails = await prisma.$queryRawUnsafe(
        `SELECT * FROM "Cocktail" ORDER BY RANDOM() LIMIT ${limit};`
      );
  
      res.json(cocktails);
    } catch (error) {
      console.error("Error fetching random cocktails:", error);
      res.status(500).send("Internal server error");
    }
  });
  
  router.get("/search", async (req, res) => {
    const query = req.query.query?.toString().toLowerCase() || "";
  
    try {
      const cocktails = await prisma.cocktail.findMany({
        where: {
          OR: [
            { common_name: { contains: query, mode: "insensitive" } },
            { scientific_name: { contains: query, mode: "insensitive" } },
          ],
        },
      });
  
      res.json(cocktails);
    } catch (error) {
      console.error("Error fetching search results:", error);
      res.status(500).send("Internal server error");
    }
  });
  
  router.get("/:cocktailId", async (req, res) => {
    const { cocktailId } = req.params;
    const id =  Number(cocktailId)
    try {
      const cocktail = await prisma.cocktail.findUnique({
        where: { id: id },
      });
  
      if (!cocktail) {
        return res.status(404).send("cocktail not found");
      }
  
      res.json(cocktail);

    } catch (error) {
      console.error("Error fetching cocktail details:", error);
      res.status(500).send("Internal server error");
    }
  });
  
// Export Both the Function and Router
module.exports = router
