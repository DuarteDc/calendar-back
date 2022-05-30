const { response } = require('express');
const Event = require('../models/Event');

const getEvents = async (req, res = response) => {

    const events = await Event.find().populate('user', 'name');

    res.status(200).json({
        ok: true,
        events,
    })

}

const createEvent = async (req, res = response) => {

    const event = new Event(req.body);

    try {

        event.user = req.id;
        const eventDB = await event.save();

        res.status(201).json({
            ok: true,
            event: eventDB
        });

    } catch (error) {

        res.status(400).json({
            ok: true,
            message: 'Error al crear un evento'
        });

    }

}

const updateEvent = async (req, res = response) => {

    const id = req.params.id;
    const uid = req.id;

    try {

        const event = await Event.findById(id);

        if (!event) {
            return res.status(404).json({
                ok: false,
                message: 'El evento no existe',
            })
        }

        if (event.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                message: 'No autorizado para editar este evento',
            });
        }

        const newEvent = {
            ...req.body,
            user: uid,
        }

        const eventUpdated = await Event.findByIdAndUpdate(id, newEvent, { new: true });

        res.status(200).json({
            ok: true,
            message: 'Evento actualizado correctamente',
            event: eventUpdated,
        })

    } catch (error) {

        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'Hubo un error al actualizar el evento',
        });

    }

}

const deleteEvent = async (req, res = response) => {

    const id = req.params.id;
    const uid = req.id;

    try {

        const event = await Event.findById(id);

        if (!event) {
            return res.status(401).json({
                ok: false,
                message: 'El evento no existe',
            })
        }

        if (event.user.toString() !== uid) {
            return res.status(404).json({
                ok: false,
                message: 'No autorizado para eliminar este evento',
            })
        }

        await Event.findByIdAndDelete(id);

        res.status(200).json({
            ok: true,
            message: 'El evento se elimino con exito',
        })


    } catch (error) {

        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'Parece que hubo un error al eliminar el evento',
        });

    }


}

module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent
}