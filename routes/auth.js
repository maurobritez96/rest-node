const {Router} = require('express');
const router = Router();

const { login } = require('../controllers/auth');
const { check } = require('express-validator');
const { fieldValidator } = require('../middlewares/field-validator');


router.post('/login',[
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    fieldValidator
], login);



module.exports = router;