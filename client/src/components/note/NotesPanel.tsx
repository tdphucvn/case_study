import React from 'react';
import NotesPanelHeader from './NotesPanelHeader';
import SearchBar from './SearchBar';
import NotesPreviewContainer from './NotesPreviewContainer';

import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
    panelContainer: {
        height: '100vh',
        maxHeight: '100vh',
        backgroundColor: '#F8F8F8'
    },
}));

const NotesPanel = () => {
    const classes = useStyles();
    
    return (
        <div className={classes.panelContainer}>
            <NotesPanelHeader />
            <SearchBar />
            <NotesPreviewContainer />
        </div>
    )
};

export default NotesPanel;
