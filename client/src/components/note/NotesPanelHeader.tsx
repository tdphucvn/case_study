import React from 'react';
import { Typography, makeStyles, IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles(() => ({
    panelHeaderContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    addButton: {
    }
}));

const NotesPanelHeader = () => {
    const classes = useStyles();

    return (
        <div className={classes.panelHeaderContainer}>
            <Typography variant="h5" align="center" display="inline">Notes</Typography>
            <IconButton className={classes.addButton} color="primary"><AddIcon /></IconButton>
        </div>
    )
};

export default NotesPanelHeader;
