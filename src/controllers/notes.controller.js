const notesCtrl = {}
const Note = require('../models/Note')

//CREAR NOTA
notesCtrl.renderNoteForm = (req,res) => {
    // console.log(req.user.id)
    res.render('notes/new-note')
}

notesCtrl.createNewNote = async(req,res) => {
    const {title , description} = req.body
    const newNote = new Note({title, description})
    newNote.user = req.user.id          //req.user.id lo obtiene de passport
    await newNote.save()
    req.flash('success_msg','Note Added Successfully')
    res.redirect('/notes')
}

//MOSTRAR TODAS LAS NOTAS
notesCtrl.renderNotes =async(req,res) => {
    const notes =await Note.find({user : req.user.id}).sort({createdAt: 'desc'}).lean()
    res.render('notes/all-notes',{notes})
}

//EDITAR 
notesCtrl.renderEditForm =async(req,res) => {
    const note =await Note.findById(req.params.id ).lean()
    if (note.user != req.user.id) {
        req.flash('error_msg','Not authorized')
        res.redirect('/notes')
    }
    res.render('notes/edit-note',{note})
}

notesCtrl.updateNote = async(req,res) => {
    const {title , description} = req.body
    await Note.findByIdAndUpdate(req.params.id,{title, description})
    req.flash('success_msg','Note Updated Successfully')
    res.redirect('/notes')
}


//DELETE
notesCtrl.deleteNote = async(req,res) => {
    await Note.findByIdAndDelete(req.params.id)
    req.flash('success_msg','Note Deleted Successfully')
    res.redirect('/notes')
}
module.exports = notesCtrl