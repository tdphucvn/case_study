import React, { useEffect, useState } from 'react';
import NotePanelPreview from './NotePanelPreview';
import { Container, Grid, makeStyles } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

const useStyles = makeStyles((theme) => ({
    notesContainer: {
        height: '80%',
        maxHeight: '80%',
        width: '80%',
        padding: '0',
        overflow: 'auto',
    }
}));

export interface INote {
    _id: string;
    active?: boolean;
    title: string;
    preview: string;
    date: string;
    content: string;
}

interface IProps {
    searchQuery: string;
};

const NotesPreviewContainer = (props: IProps) => {
    const classes = useStyles();
    const { notes } = useSelector((state: RootState) => state.notes);
    const [displayedNotes, setDisplayedNotes] = useState<Array<INote>>([]);

    useEffect(() => {
        if(props.searchQuery === '') setDisplayedNotes(notes);
        const searchNotesRegex = new RegExp(props.searchQuery, "i");
        filterNotes(searchNotesRegex);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.searchQuery, notes]);

    const filterNotes = (regex: any ) => {
        let searchedProducts = [...notes].filter(note => regex.test(note.preview));
        setDisplayedNotes(searchedProducts);
    };

    return (
        <Container className={classes.notesContainer}>
            <Grid container direction="column">
                {displayedNotes.map((note: INote, index) => (
                    <NotePanelPreview key={index} note={note}/>
                ))}
            </Grid>
        </Container>
    )
};

export default NotesPreviewContainer;