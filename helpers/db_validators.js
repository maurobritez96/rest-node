const Role = require('../models/role');
const User = require('../models/user');

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

module.exports = {
    isValidRole,
    isValidEmail,
    existUserById
}