const {Router} = require('express');
const { check } = require('express-validator');

const { fieldValidator } = require('../middlewares');
const { getCategories, getCategory, createCategory, updateCategory, deleteCategory } = require('../controllers/categories');

const router = Router();

router.get('/', getCategories);
router.get('/:id', getCategory);
router.post('/', createCategory);
router.put('/:id', updateCategory);
router.delete('/:id', deleteCategory);



module.exports = router;