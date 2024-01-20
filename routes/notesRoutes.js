var express = require('express');
const { getNotes, createNotes, deleteNotes, updateNotes } = require('../controllers/noteController');
const auth = require('../middlewares/authentication');
var notesRoutes = express.Router();



notesRoutes.get('/pakoda', auth, getNotes);

notesRoutes.post('/pakoda', auth, createNotes);

notesRoutes.delete('/pakoda/:id', auth, deleteNotes);

notesRoutes.put('/pakoda/:id', auth, updateNotes);


module.exports = notesRoutes;
