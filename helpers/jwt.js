const jtw = require('jsonwebtoken');

const generateJWT = (id, name) => {

    return new Promise((resolve, reject) => {

        const payload = { id, name };

        jtw.sign(payload, process.env.SECRET_JWT_SEED, {
            expiresIn: '2h'
        }, (error, token) => {

            if (error) {
                console.log(error);
                reject('No se pudo generar el token');
            }

            resolve(token);

        });

    });

}

module.exports = {
    generateJWT
}