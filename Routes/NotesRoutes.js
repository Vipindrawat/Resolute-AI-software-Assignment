import express from 'express';
import Authentication from '../Middleware/Authentication.js';
import notesModel from '../Models/NotesModel.js';
import { body, validationResult } from 'express-validator';

const router = express.Router();

router.get('/getNotes', Authentication, async (req, res) => {
    try {
        const userId = req.user.id;
        const notes = await notesModel.find({ user: userId });
        res.json({ "success": true, notes });

    }
    catch (error) {
        res.status(500).json({ "success": false, error })
    }
})

router.post('/addnote', Authentication, [
    body('title', "title shoule be of atleast 2 characters").isLength({ min: 2 }),
    body('description', "description should be of atleast 4 characters").isLength({ min: 4 }),
    body('content', "content should be of atleast 6 characters").isLength({ min: 6 })
], async (req, res) => {
    try {

        const result = validationResult(req);
        if (result.isEmpty()) {
            const { title, description, content } = req.body;
            const userId = req.user.id;
            await notesModel.create({
                user: userId, title, description, content
            })
            res.json({ "success": true, "result": "Note added successfully" });
        }
        else {
            res.json({ "success": false, "error": result.array() })
        }
    }
    catch (error) {
        res.status(500).json({ "success": false, error })
    }
})

router.put('/editnote/:noteId', Authentication, [
    body('title', "title shoule be of atleast 2 characters").isLength({ min: 2 }).optional(),
    body('description', "description should be of atleast 4 characters").isLength({ min: 4 }).optional(),
    body('content', "content should be of atleast 6 characters").isLength({ min: 6 }).optional()
], async (req, res) => {
    try {
        const noteId = req.params.noteId;
        const userId = req.user.id;
        const findNote = await notesModel.findById(noteId);
        if (!findNote) {
            return res.status(404).json({ "success": false, "error": "Note not found" });
        }
        if (userId !== findNote.user.toString()) {
            return res.status(401).json({ "success": false, "error": "Unauthorized" });
        }
        const updatedNote = await notesModel.findByIdAndUpdate(noteId, req.body, { new: true });
        res.json({ "success": true, "result": updatedNote });

    }
    catch (error) {
        res.status(500).json({ "success": false, error })
    }
})

router.delete('/deletenote/:noteId', Authentication, async (req, res) => {
    try {

        const noteId = req.params.noteId;
        const userId = req.user.id;
        const findNote = await notesModel.findById(noteId);
        if (!findNote) {
            return res.status(404).json({ "success": false, "error": "Note not found" });
        }

        if (userId !== findNote.user.toString()) {
            return res.status(401).json({ "success": false, "error": "Unauthorized" });
        }
        await notesModel.findByIdAndDelete(noteId);
        res.json({ "success": true, "result": "note Deleted successfully" });

    }
    catch (error) {
        res.status(500).json({ "success": false, error })
    }
})


export default router;
