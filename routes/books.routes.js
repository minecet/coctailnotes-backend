const router = require('express').Router()
const prisma = require('../db')
//  POST /api/books  -  Creates a new book
router.post('/', async(req, res, next) => {
  const { title, year, summary, quantity, genre, authorId } = req.body;
 
  const newBookData = {
    title,
    year,
    summary,
    quantity,
    genre,
    authorId
  };
  try{
    const newBook = await prisma.book.create({ data: newBookData })
    console.log('New book created', newBook);
    res.status(201).json(newBook);
  }catch(error){
    next(error);
  }
});

router.get('/', async(req, res, next) => {
  try{
    const allBooks = await prisma.book.findMany({ include: { author: true } })
    res.json(allBooks);
  }catch(error){
    next(error);
  }
})

router.get('/:bookId', async(req, res, next) => {
  try{
    //select, omit (e.g. strip userpassword using omit)
    const book = await prisma.book.findFirstOrThrow({where: {id: req.params.bookId}, select: { title: true}, include:{author: true}})
    res.json(book);
  }catch(error){
    next(error);
  }
})

router.put('/:bookId', async(req, res, next) => {
  const { title, year, summary, quantity, genre, authorId } = req.body;

  const newBookDetails = {
    title,
    year,
    summary,
    quantity,
    genre,
    authorId
  };
  try{
    //select, omit (e.g. strip userpassword using omit)
    const updatedbook = await prisma.book.update({ where: { id: req.params.bookId }, data: newBookDetails })
    res.status(202).json(updatedbook);
  }catch(error){
    next(error);
  }
})

router.delete('/:bookId', async(req, res, next) => {
  try{
    //select, omit (e.g. strip userpassword using omit)
    const book = await prisma.book.delete({where: {id: req.params.bookId}})
    res.json(book);
    // or
    // await prisma.book.delete({where: {id: req.params.bookId}})
    // res.status(204).json();
  }catch(error){
    next(error);
  }
})

module.exports = router
