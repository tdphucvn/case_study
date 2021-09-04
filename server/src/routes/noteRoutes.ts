import express from 'express';
import authenticate from '../middleware/authentication.middleware';
import { getNotes, addNote, editNote, deleteNote } from '../controllers/notes';


const router = express.Router();
router.use(authenticate);

router.get('/getNotes', getNotes)
router.post('/addNote', addNote)
router.put('/editNote/:id', editNote)
router.delete('/deleteNote/:id', deleteNote)

export default router;