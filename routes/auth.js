const { Router } = require('express');
const { check } = require('express-validator');

const { validator } = require('../middlewares/validators');
const { validateJWT } = require('../middlewares/javlidateJWT');

const router = Router();

const { createUser, login, revaliteToken, } = require('../controllers/auth')

router.post('/new', [
    check('name', 'El nombre es requerido').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password debe contener al menos 6 caracteres').isLength({ min: 6 }),
    validator
], createUser);

router.post('/', [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password debe contener al menos 6 caracteres').isLength({ min: 6 }),
    validator
], login)

router.get('/renew', validateJWT, revaliteToken)

module.exports = router;