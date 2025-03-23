const { jwtGenerator } = require('../helpers/jwt-generator');
const User = require('../models/user');
const bcryptjs = require('bcryptjs');

const login = async (req, res) => {

    const {email, password} = req.body;

    try {
        const user = await User.findOne({email});
        if (!user) {
            return res.status(400).json({
                msg: 'User / Password are not correct - email'
            })
        }

        if (!user.status) {
            return res.status(400).json({
                msg: 'User / Password are not correct - status: false'
            })
        }

        const validPassword = bcryptjs.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: 'User / Password are not correct - password'
            })
        }

        const token = await jwtGenerator(user.id);
        res.json({
            user,
            token
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Talk to the administrator'
        })
    }

    
}

module.exports = {
    login
}