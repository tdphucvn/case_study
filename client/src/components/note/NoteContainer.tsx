import React, {useState, useEffect} from 'react';
import { useParams, useHistory } from 'react-router';
import { Link as RouterLink } from 'react-router-dom';
import { Typography, makeStyles, Button } from '@material-ui/core';
import ToolBar from './ToolBar';
import noteStyles from '../../css/note.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../redux/store';
import { addNote, updateNote, deleteNote } from '../../api/notesApi';
import { INote } from './NotesPreviewContainer';
import { addNote as addNoteReducer, updateNote as updateNoteReducer, setActive, deleteNote as deleteNoteReducer, cleanNotes } from '../../redux/reducers/notes';
import { unauthorized, updateAccessToken } from '../../redux/reducers/authenticate';

const useStyles = makeStyles((theme) => ({
    noteContainer: {
        height: 'calc(80% - 48px)',
        maxHeight: 'calc(80% - 48px)',
        padding: '24px',
    },
    date: {
        marginTop: theme.spacing(5),
    },
    errorMessage: {
        height: '90%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    }
}));

interface IParams {
    id: string;
};

const NoteContainer = () => {
    const classes = useStyles();
    const { id } = useParams<IParams>();
    const [newNote, setNewNote] = useState<boolean>(false);
    const [note, setNote] = useState<INote>(null);
    const [noteContent, setNoteContent] = useState<string>('');
    const [editDate, setEditDate] = useState<string>('');
    const { accessToken } = useSelector((state: RootState) => state.auth);
    const { notes } = useSelector((state: RootState) => state.notes);
    const dispatch = useDispatch<AppDispatch>();
    const history = useHistory();

    // if the minutes are less than 10 add aditional '0'
    const getFullMinutes = (min: number) => {
        if(min < 10) return '0'+ min;
        return min; 
    };

    useEffect(() => {
        if(id === "new") { 
            setNoteContent(''); 
            setNewNote(true);
            setNote(null);
            const currentDate = new Date();
            const createDate = currentDate.getDate() + '.' + currentDate.getMonth() + '.' + currentDate.getFullYear() + ' ' + currentDate.getHours() + ':' + getFullMinutes(currentDate.getMinutes());
            setEditDate(createDate);       
        }
        else {
            setNewNote(false);
            // find the note in the database
            const displayedNote = notes.find((note: INote) => note._id === id);
            setNote(displayedNote);
            if(displayedNote === undefined) return;
            setNoteContent(displayedNote.content);

            // creating published date value
            const date = new Date(displayedNote.date);
            const publishedDate = date.getDate() + '.' + date.getMonth() + '.' + date.getFullYear() + ' ' + date.getHours() + ':' + getFullMinutes(date.getMinutes());
            
            setEditDate(publishedDate);
            // set the current note to be active
            dispatch(setActive(displayedNote));
        };

    }, [id, notes, dispatch]);

    const getNoteContent = () => {
        const editor = document.getElementById('note-editor');
        // get the formated data in the editor
        const content = editor.innerHTML;
        // get the text data in the editor
        const preview = editor.innerText;
        const title = editor.innerText.substring(0, 20);
        
        // if it is new note than call API request to create new note
        if(newNote) {
            addNote(title, content, preview, accessToken)
                .then((res) => {
                   if(res.data.accessToken !== undefined) dispatch(updateAccessToken(res.data.accessToken));
                   return res.data.savedNote;
                })
                .then((data) => {
                    // add new note to the redux store
                    dispatch(addNoteReducer(data));
                    const {_id} = data;
                    // redirect to the note URL
                    history.push(`/${_id}`);
                })
                .catch((err) => {
                    const status = err.response.status;
                    if(status === 401) unauthorizedAccess();
                });
            return;
        };

        // if client wants to update the note call API request to update note
        updateNote(title, content, preview, accessToken, id)
            .then((res) => {
                if(res.data.accessToken !== undefined) dispatch(updateAccessToken(res.data.accessToken));
                return res.data.note
            })
            // update note in the database
            .then((data) => dispatch(updateNoteReducer(data)))
            .catch((err) => {
                const status = err.response.status;
                if(status === 401) unauthorizedAccess();
            });
        return;
    };

    // call API request to delete note
    const deleteNoteFunction = () => {
        deleteNote(accessToken, id)
            .then(res => {
                if(res.data.accessToken !== undefined) dispatch(updateAccessToken(res.data.accessToken));
            })
            // delete note in the redux store
            .then(() => dispatch(deleteNoteReducer(note)))
            // redirect to the main page
            .then(() => history.push('/'))
            .catch((err) => {
                const status = err.response.status;
                if(status === 401) unauthorizedAccess();
            });
    };

    const unauthorizedAccess = () => {
        dispatch(cleanNotes());
        dispatch(unauthorized());
    }

    // on component mount display the the formated data of the note
    useEffect(() => {
        const editor = document.getElementById('note-editor');
        if(editor === null) return;
        editor.innerHTML = noteContent;
    }, [newNote, noteContent])

    if(note !== undefined) {
        return (
            <>
                <ToolBar saveFunction={getNoteContent} deleteFunction={deleteNoteFunction} note={note}/>
                <div className={classes.noteContainer}>
                    <div className={noteStyles.editor} id="note-editor" contentEditable="true"></div> 
    
                    <Typography variant="h6" color="textSecondary" className={classes.date}>Last Edit: {editDate}</Typography>
                </div>
            </>
        )
    } else {
        return (
            <div className={classes.errorMessage}>
                <Typography variant="h6" align="center">Unfortunately this note doesn't exist.</Typography>
                <Typography variant="subtitle1" align="center" gutterBottom>Please, click on the button below to share your thoughts!</Typography>
                <Button color="primary" variant="contained" component={RouterLink} to='/new'>Get started</Button>
            </div>
        )
    }
};  

export default NoteContainer;
