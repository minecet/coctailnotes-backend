const router = require('express').Router()
const prisma = require('../db')
router.get('/', (req, res) => {
  prisma.book.findMany()
  res.json('All good in here')
})

// 👇 Start handling routes here
const booksRoutes = require('./books.routes')
router.use('/books', booksRoutes)
const authorsRoutes = require('./authors.routes')
router.use('/authors', authorsRoutes)

const usersRoutes = require("./users.routes");
router.use("/users", usersRoutes);

const cocktailsRoutes = require("./cocktails.routes");
router.use("/cocktails", cocktailsRoutes);

const notesRoutes = require("./notes.routes");
router.use("/notes", notesRoutes);

module.exports = router
