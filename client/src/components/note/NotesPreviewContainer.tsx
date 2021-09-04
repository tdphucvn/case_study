import React from 'react';
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

// const notesArr: Array<INote> = [
//     {
//         _id: '89',
//         title: 'First Note',
//         date: '24.07.2017',
//         content: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Blanditiis quaerat itaque error voluptate esse? Expedita amet accusamus, repudiandae velit reiciendis corrupti cupiditate exercitationem pariatur recusandae, natus dolor voluptatem est laudantium'
//     },
//     {
//         _id: '12',
//         title: 'Second Note',
//         date: '24.07.2021',
//         content: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Blanditiis quaerat itaque error voluptate esse? Expedita amet accusamus, repudiandae velit reiciendis corrupti cupiditate exercitationem pariatur recusandae, natus dolor voluptatem est laudantium'
//     },
    
// ]

const NotesPreviewContainer = () => {
    const classes = useStyles();
    const { notes } = useSelector((state: RootState) => state.notes);
    

    return (
        <Container className={classes.notesContainer}>
            <Grid container direction="column">
                {notes.map((note: INote, index) => (
                    <NotePanelPreview key={index} note={note}/>
                ))}
            </Grid>
        </Container>
    )
};

export default NotesPreviewContainer;