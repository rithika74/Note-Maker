const mongoose=require('mongoose')

const notesSheme=new mongoose.Schema({
    title:{
        type:String
    },
    description:{
        type:String
    }
})

let Notes = mongoose.model('Notes', notesSheme, 'notes')

module.exports = Notes