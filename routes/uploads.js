

const {Router} = require('express');
const router = Router();

const { check } = require('express-validator');
const { fieldValidator } = require('../middlewares/field-validator');
const { fileValidator } = require('../middlewares/file-validator');
const { validateAvailablesCollections } = require('../helpers/db_validators');
const { updateImage, fileUpload, showImage, updateImageCloudinary } = require('../controllers/uploads');


router.post('/', fileValidator, fileUpload);

router.put('/:collection/:id',[
    fileValidator,
    check('id', 'Invalid ID').isMongoId(),
    check('collection').custom( c => validateAvailablesCollections(c, ['users', 'products'])),
    fieldValidator
], updateImageCloudinary);
// updateImage);


router.get('/:collection/:id',[
    check('id', 'Invalid ID').isMongoId(),
    check('collection').custom( c => validateAvailablesCollections(c, ['users', 'products'])),
    fieldValidator
], showImage);



module.exports = router;