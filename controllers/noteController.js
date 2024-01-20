const noteModel = require('../models/notes');



const createNotes = async ( req, res ) => {

    console.log(req.userId);

    const { title, description } = req.body;

    const newNotes = new noteModel({

        title: title,
        description: description,
        userId: req.userId

    });

    try {
        
        await newNotes.save()
        res.status(201).json(newNotes);

    } catch (error) {
        console.log(error);
        res.status(500).json( {message: "Something went wrong"} )
    }


};


const getNotes = async ( req, res ) => {

    try {
        
        const notes = await noteModel.find({ userId: req.userId })
        res.status(200).json(notes)

    } catch (error) {
        console.log(error);
        res.status(500).json( {message: "Something went wrong"} )
    }

};

const updateNotes = async ( req, res ) => {

    const id = req.params.id;
    const { title, description } = req.body;

    const newNotes = {
        title: title,
        description: description,
        userId: req.userId
    }

    try {
        
        await noteModel.findByIdAndUpdate( id, newNotes, { new: true } )
        res.status(200).json(newNotes)
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" })
    }

};


const deleteNotes = async ( req, res ) => {

    const id = req.params.id;

    try {
        
        const note = await noteModel.findByIdAndRemove(id)
        res.status(202).json(note);

    } catch (error) {
        
        console.log(error);
        res.status(500).json({ message: "Something went wrong" })
        
    }

};



module.exports = { createNotes, updateNotes, deleteNotes, getNotes };