const User = require('../models/user');
const bcryptjs = require('bcryptjs');

const getUsers = async (req, res) => {

    const {limit = 5, from = 0} = req.query;
    const query = {status: true};

    // promise.all para ejecutar las dos promesas al mismo tiempo
    const [total, users] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
            .skip(Number(from)) //desde que registro
            .limit(Number(limit)) // cuantos registros
    ])

    res.json({
        total,
        users
    })
}

const createUser = async (req, res) => {
    const {name, email, password, role} = req.body
    const user = new User({name, email, password, role});

    // encriptar pass
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    // guardar en db
    await user.save();

    res.json({
        user
    })
}
const updateUser = async (req, res) => {
    const {password, google, email, ...rest} = req.body;
    const {id} = req.params;
  
    // validar contra base de datos
    if(password){
        // encriptar contraseña
        const salt = bcryptjs.genSaltSync();
        rest.password = bcryptjs.hashSync(password, salt);
    }

    const user = await User.findByIdAndUpdate(id, rest);

    res.json({
        user
    })
}
const deleteUser = async (req, res) => {
    const {id} = req.params;
    const user = await User.findByIdAndUpdate(id, {status: false});
    res.json({
        user
    })
}

module.exports = {
    getUsers,
    createUser,
    updateUser,
    deleteUser
}