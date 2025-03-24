const { googleVerify } = require('../helpers/google-verify');
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

const googleSignIn = async (req, res) => {
    const {id_token} = req.body;

    try {
        const {name, picture, email} = await googleVerify(id_token);

        let user = await User.findOne({email});
        
        // si el usuario no existe tengo que crearlo
        if (!user) {
            const data = {
                name,
                email,
                password: ':P',
                picture,
                role: 'USER_ROLE',
                google: true
            }

            user = new User(data);
            await user.save();
        }

        // su el usuario en la DB esta en false
        if (!user.status) {
            return res.status(401).json({
                msg: 'User blocked, talk to the administrator'
            })
        }

        // generar el JWT
        const token = await jwtGenerator(user.id);

        res.json({
            user,
            token,
            
        })
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            ok: false,
            msg: 'TOKEN CANT BE VERIFIED'
        })
    }

    
}

module.exports = {
    login,
    googleSignIn
}