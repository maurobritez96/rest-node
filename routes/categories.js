const {Router} = require('express');
const { check } = require('express-validator');

const { fieldValidator, jwtValidator, adminRole } = require('../middlewares');
const { getCategories, getCategory, createCategory, updateCategory, deleteCategory } = require('../controllers/categories');
const { existCategoryById } = require('../helpers/db_validators');

const router = Router();

router.get('/', getCategories);
router.get('/:id',[
    jwtValidator,
    check('id', 'Invalid ID').isMongoId(),
    check('id').custom(existCategoryById),
    fieldValidator
], getCategory);
router.post('/',[
    jwtValidator,
    check('name', 'Name is required').not().isEmpty(),
    fieldValidator
],
createCategory);
router.put('/:id',[
jwtValidator,
check('name', 'Name is required').not().isEmpty(),
check('id', 'Invalid ID').isMongoId(),
check('id').custom(existCategoryById),
fieldValidator
], updateCategory);
router.delete('/:id',[
jwtValidator,
adminRole,
check('id', 'Invalid ID').isMongoId(),
check('id').custom(existCategoryById),
fieldValidator
], deleteCategory);



module.exports = router;