const {Product, User, Role, Category} = require('../models');

const isValidRole = async(role = '') => {
    const existRole = await Role.findOne({role});
    if (!existRole) {
        throw new Error(`Role ${role} is not registered in the DB`);
    }
}

const isValidEmail = async(email = '') => {
    const existEmail = await User.findOne({email});
    if (existEmail) {
        throw new Error(`Email ${email} is already registered`);
    }
}

const existUserById = async(id) => {
    const existUser = await User.findById(id);
    if (!existUser) {
        throw new Error(`ID ${id} does not exist`);
    }
}

const existCategoryById = async(id) => {
    const existCategory = await Category.findById(id);
    if (!existCategory) {
        throw new Error(`ID ${id} does not exist`);
    }
}

const existProductById = async(id) => {
    const existProduct = await Product.findById(id);
    if (!existProduct) {
        throw new Error(`ID ${id} does not exist`);
    }
}

const validateAvailablesCollections = (collection = '', collections = []) => {
    const include = collections.includes(collection);
    if (!include) {
        throw new Error(`Collection ${collection} is not allowed`);
    }
    return true;
}

module.exports = {
    isValidRole,
    isValidEmail,
    existUserById,
    existCategoryById,
    existProductById,
    validateAvailablesCollections
}