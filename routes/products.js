const {Router} = require('express');
const { check } = require('express-validator');

const { fieldValidator, jwtValidator, adminRole } = require('../middlewares');
const { existProductById, existCategoryById } = require('../helpers/db_validators');
const { getProducts, getProduct, createProduct, updateProduct, deleteProduct, getProductsByCategory } = require('../controllers/product');


const router = Router();

router.get('/', getProducts );
router.get('/:id',[
    jwtValidator,
    check('id', 'Invalid ID').isMongoId(),
    check('id').custom(existProductById),
    fieldValidator
], getProduct);
router.get('/category/:id',[
    jwtValidator,
    check('id', 'Invalid ID').isMongoId(),
    check('id').custom(existCategoryById),
    fieldValidator
], getProductsByCategory);
router.post('/',[
    jwtValidator,
    check('name', 'Name is required').not().isEmpty(),
    check('category', 'Category is required').isMongoId(),
    check('category').custom(existCategoryById),
    fieldValidator
], createProduct);
router.put('/:id',[
    jwtValidator,
    check('name', 'Name is required').not().isEmpty(),
    check('category', 'Category is required').isMongoId(),
    check('category').custom(existCategoryById),
    check('id', 'Invalid ID').isMongoId(),
    check('id').custom(existProductById),
    fieldValidator
], updateProduct);
router.delete('/:id',[
    jwtValidator,
    adminRole,
    check('id', 'Invalid ID').isMongoId(),
    check('id').custom(existProductById),
    fieldValidator
], deleteProduct);



module.exports = router;