import React, {useState} from 'react';
import NotesPanelHeader from './NotesPanelHeader';
import SearchBar from './SearchBar';
import NotesPreviewContainer from './NotesPreviewContainer';

import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    panelContainer: {
        height: '100vh',
        maxHeight: '100vh',
        backgroundColor: theme.palette.primary.dark,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        }
    },
}));

const NotesPanel = () => {
    const classes = useStyles();
    const [searchQuery, setSearchQuery] = useState<string>('');

    return (
        <div className={classes.panelContainer}>
            <NotesPanelHeader />
            <SearchBar setSearchQuery={setSearchQuery}/>
            <NotesPreviewContainer searchQuery={searchQuery} />
        </div>
    )
};

export default NotesPanel;
