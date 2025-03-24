const {Router} = require('express');
const router = Router();

const { login, googleSignIn } = require('../controllers/auth');
const { check } = require('express-validator');
const { fieldValidator } = require('../middlewares/field-validator');


router.post('/login',[
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    fieldValidator
], login);

router.post('/google',[
    check('id_token', 'id_token is required').not().isEmpty(),
    fieldValidator
], googleSignIn);


module.exports = router;