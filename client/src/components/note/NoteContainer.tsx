import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router';
import { Typography, makeStyles } from '@material-ui/core';
import ToolBar from './ToolBar';
import noteStyles from '../../css/note.module.css';


const useStyles = makeStyles((theme) => ({
    noteContainer: {
        height: 'calc(80% - 48px)',
        maxHeight: 'calc(80% - 48px)',
        padding: '24px',
    },
    // noteInput: {
    //     width: '100%'
    // },
    date: {
        marginTop: theme.spacing(5),
    }
}));

interface IParams {
    id: string;
}

const NoteContainer = () => {
    const classes = useStyles();
    const { id } = useParams<IParams>();
    const [newNote, setNewNote] = useState<boolean>(false);
    const [note, setNote] = useState<string>('');

    useEffect(() => {
        id === "new" ? setNewNote(true) : setNewNote(false);
        if(id === "new") { setNote(''); setNewNote(true) };
    }, [id]);

    const getNoteContent = () => {
        const editor = document.getElementById('note-editor');
        console.log(editor.innerHTML);
    };

    useEffect(() => {
        const editor = document.getElementById('note-editor');
        editor.innerHTML = note;
    }, [newNote, note])

    return (
        <>
            <ToolBar saveFunction={getNoteContent} />
            <div className={classes.noteContainer}>
                {/* <TextField 
                    id="note-content"
                    className={classes.noteInput}
                    placeholder="Write down your ideas..."
                    multiline
                    rows={30}
                    variant="outlined"
                /> */}

                <div className={noteStyles.editor} id="note-editor" contentEditable="true"></div> 

                <Typography variant="h6" color="textSecondary" className={classes.date}>Last Edit: 25.07.2011</Typography>
            </div>
        </>
    )
};

export default NoteContainer;
