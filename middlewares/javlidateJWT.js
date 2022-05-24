const { response } = require('express');

const jwt = require('jsonwebtoken');

const validateJWT = (req, res = response, next) => {

    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            ok: false,
            message: 'jwt is required',
        });
    }

    try {

        const { id, name } = jwt.verify(token, process.env.SECRET_JWT_SEED);

        req.id = id;
        req.name = name;

    } catch (error) {

        return res.status(401).json({
            ok: false,
            message: 'invalid token',
        });

    }

    next();
}

module.exports = {
    validateJWT
}