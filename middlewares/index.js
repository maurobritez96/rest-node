const fieldValidator = require('../middlewares/field-validator');
const jwtValidator = require('../middlewares/jwt-validator');
const rolesValidator = require('../middlewares/role-validator');

module.exports = {
    ...fieldValidator,
    ...jwtValidator,
    ...rolesValidator
}