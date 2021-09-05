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
        backgroundColor: theme.palette.primary.dark,
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

    // on change of notes, and search query values
    useEffect(() => {
        // if the search query is empty display unfiltered notes
        if(props.searchQuery === '') setDisplayedNotes(notes);
        // creating a regex with search query
        const searchNotesRegex = new RegExp(props.searchQuery, "i");
        // filter notes with the given regex
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