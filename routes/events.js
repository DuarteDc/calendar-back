const { Router } = require('express');
const { check } = require('express-validator');

const router = Router();

const { validateJWT } = require('../middlewares/javlidateJWT')
const { isDate } = require('../helpers/isDate');
const { getEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/events');
const { validator } = require('../middlewares/validators');

router.use(validateJWT);

router.get('/', getEvents);

router.post('/',
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'La fecha de inicio es obligatoria').custom(isDate),
        check('end', 'La fecha de finalización es obligatoria').custom(isDate),
        validator
    ],
    createEvent);

router.put('/:id',
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'La fecha de inicio es obligatoria').custom(isDate),
        check('end', 'La fecha de finalización es obligatoria').custom(isDate),
        validator
    ],
    updateEvent);

router.delete('/:id', deleteEvent);

module.exports = router;