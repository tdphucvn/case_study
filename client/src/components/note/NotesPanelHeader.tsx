import React from 'react';
import { Typography, makeStyles, IconButton } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles(() => ({
    panelHeaderContainer: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '10%',
        width: '100%',
    },
    addButton: {
        position: 'absolute',
        top: '50%',
        right: '20px',
        transform: 'translate(-50%, -50%)',
    }
}));

const NotesPanelHeader = () => {
    const classes = useStyles();

    return (
        <div className={classes.panelHeaderContainer}>
            <Typography variant="h5" align="center" color="primary">Notes</Typography>
            <IconButton className={classes.addButton} color="primary" size="medium" component={RouterLink} to="/new"><AddIcon style={{fontSize: '2rem'}}/></IconButton>
        </div>
    )
};

export default NotesPanelHeader;
