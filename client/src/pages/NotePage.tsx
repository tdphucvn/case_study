import React from 'react';
import NotesPanel from '../components/note/NotesPanel';
import NoteNavigation from '../components/note/NoteNavigation';
import NoteContainer from '../components/note/NoteContainer';

import { Grid } from '@material-ui/core';

const NotePage = () => {
    return (
        <Grid container>
            <Grid item md={3} xs={12}>
                <NotesPanel />
            </Grid>
            <Grid item md={9} xs={12}>
                <NoteNavigation />
                <NoteContainer />
            </Grid>
        </Grid>
    )
};

export default NotePage;
