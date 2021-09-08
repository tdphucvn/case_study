import {Request, Response} from 'express';
import Note from '../model/Note';
import { INote } from '../types/interfaces';

export const getNotes = async (req: Request | any, res: Response): Promise<void> => {
    try {
        const { user } = req.decoded;
        console.log(user)
        const { user_id: id } = user;

        // get all the notes from the database that belong to the client
        const notes = await Note.find({user: id}).sort({date: -1});
        
        const newAccessToken = req.accessToken;
        // if the new accessToken is provided send it with the response to the client side
        if(newAccessToken) { res.send({ notes, newAccessToken }); return; }
        res.send({notes, newAccessToken: null});  
    } catch (error) {
        console.log(error);
        res.status(500).send({message: new Error('Something went wrong')});
    };
};

export const addNote = async (req: Request | any, res: Response): Promise<void> => {
    try {
        const { user } = req.decoded;
        console.log(user)
        const { user_id: id } = user;

        // get the data from the client
        const { title, content, preview } = req.body;
        const newNote: INote = new Note({
            title,
            preview,
            content,
            date: new Date(),
            user: id,
        });

        const savedNote = await newNote.save();
        const accessToken = req.accessToken;
        // if the new accessToken is provided send it with the response to the client side
        if(!accessToken) {res.json({message: 'Note added', savedNote}); return;}
        res.json({message: 'Note added', savedNote, accessToken});    
    } catch (error) {
        console.error(error);
        res.status(500).json({ err: 'Something went wrong' });
    };
};

export const editNote = async (req: Request | any, res: Response) => {
    try {
        const { id } = req.params;
        const { title, preview, content } = req.body;

        // find the updated note in the database
        const note = await Note.findById(id);
        if(note === null) throw new Error('Note does note exist.');
        note.title = title;
        note.preview = preview;
        note.content = content;
        note.date = new Date();
        await note.save();

        const accessToken = req.accessToken;
        // if the new accessToken is provided send it with the response to the client side
        if(!accessToken) {res.json({message: 'Succesfully updated', note}); return;}
        res.json({message: 'Succesfully updated', note, accessToken});
    } catch (error) {
        console.log(error);
        res.status(400).json({message: 'Note is not in the database'});
    };
};

export const deleteNote = async (req: Request | any, res: Response): Promise<void> => {
    try {
        const accessToken = req.accessToken;
        const { id } = req.params;

        // find the deleted note in the database
        const note = await Note.findById(id);
        if(note === null) throw new Error('Note does not exist.')
        const deletedNote = await note.remove();
        // if the new accessToken is provided send it with the response to the client side
        if(!accessToken) {res.json({message: 'Succesfully deleted', deletedNote}); return;}
        res.json({message: 'Succesfully deleted', deletedNote, accessToken});
    } catch (error) {
        console.log(error);
        res.status(400).json({message: error});
    };
};