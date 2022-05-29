const { response } = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/User');
const { generateJWT } = require('../helpers/jwt');

const createUser = async (req, res = response) => {

    const { email, password } = req.body;

    try {

        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({
                ok: false,
                message: 'El usuario ya existe',
            });
        }

        user = new User(req.body);

        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        await user.save();

        const token = await generateJWT(user.id, user.name);

        res.status(201).json({
            ok: true,
            user,
            token
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            message: 'Error al crear el usuario'
        });

    }
}

const login = async (req, res = response) => {

    const { email, password } = req.body;

    try {

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                ok: false,
                message: 'No existe un usario con este email'
            });
        }

        //Valida la contraseña
        const validPassword = bcrypt.compareSync(password, user.password);

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                message: 'Contraseña no valida',
            });
        }

        const token = await generateJWT(user.id, user.name);

        res.status(200).json({
            ok: true,
            id: user._id,
            name: user.name,
            email: user.email,
            token,
        })


    } catch (error) {

        return res.status(500).json({
            ok: false,
            message: 'Error al iniciar sesión'
        });

    }

}

const revaliteToken = async (req, res = response) => {

    const { id, name } = req;

    const token = await generateJWT(id, name);

    res.json({
        ok: true,
        id,
        name,
        token,
    });
}

module.exports = {
    createUser,
    login,
    revaliteToken,
}