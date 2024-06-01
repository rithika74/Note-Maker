const express = require('express');
const app = express();
const port = 5000;
const mongoose = require('mongoose');
const Notes = require('./model/notes');
const cors = require('cors');

mongoose.connect('mongodb://127.0.0.1:27017/notes')
    .then(() => console.log('Connected to MongoDB!'))
    .catch((error) => console.error('Connection error:', error));

const db = mongoose.connection;

app.use(express.json());
app.use(cors());

app.post('/addnote', async (req, res) => {
    try {
        const { title, description } = req.body;
        const newNotes = new Notes({ title, description });
        const response = await newNotes.save();
        res.json(response);
    } catch (error) {
        console.error('Error adding note:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/view', async (req, res) => {
    try {
        const notes = await Notes.find();
        if (notes.length > 0) {
            const formattedNotes = notes.map(note => ({
                _id: note._id,
                title: note.title,
                description: note.description
            }));
            res.json(formattedNotes);
        } else {
            res.json({ result: 'No notes found' });
        }
    } catch (error) {
        console.error('Error retrieving notes:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.put('/update/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const { title, description } = req.body;

        const notes = await Notes.findById(id);
        if (!notes) {
            return res.status(404).json({ message: 'Note not found' });
        }

        if (title !== undefined) {
            notes.title = title;
        }
        if (description !== undefined) {
            notes.description = description;
        }

        const updatedNotes = await notes.save();
        res.json({ message: 'Note updated successfully', notes: updatedNotes });
    } catch (error) {
        console.error('Error updating note:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;

        const response = await Notes.findByIdAndDelete(id);
        if (!response) {
            return res.status(404).json({ message: 'Note not found' });
        }
        res.json({ message: 'Note deleted successfully', notes: response });
    } catch (error) {
        console.error('Error deleting note:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
