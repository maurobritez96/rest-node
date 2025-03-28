const {Router} = require('express');
const { check } = require('express-validator');
const { isValidRole, isValidEmail, existUserById } = require('../helpers/db_validators');
const { getUsers, createUser, updateUser, deleteUser } = require('../controllers/users');

const { fieldValidator, jwtValidator, adminRole, hasRole } = require('../middlewares');

const router = Router();

router.get('/', getUsers)
router.post('/',[
    check('email', 'Email is required').isEmail(),
    check('email').custom(isValidEmail),
    check('name', 'Name is required').not().isEmpty(),
    check('password', 'Password is required').not().isEmpty(),
    // check('role', 'Invalid role').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('role').custom(isValidRole),
    fieldValidator
], createUser)
router.put('/:id',[
    check('id', 'Invalid ID').isMongoId(),
    check('id').custom(existUserById),
    // check('role').custom(isValidRole),
    fieldValidator
], updateUser)
router.delete('/:id',[
    jwtValidator,
    adminRole,
    // hasRole('ADMIN_ROLE', 'USER_ROLE', 'SALES_ROLE'),   
    check('id', 'Invalid ID').isMongoId(),
    check('id').custom(existUserById),
    fieldValidator
], deleteUser)


module.exports = router;