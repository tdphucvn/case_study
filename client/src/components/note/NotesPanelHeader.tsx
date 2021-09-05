import React, {useEffect} from 'react';
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

interface IProps {
    toggleDrawer?: () => void;
}

const NotesPanelHeader = (props: IProps) => {
    const classes = useStyles();
    const {toggleDrawer} = props;

    useEffect(() => {
        // if the toggle drawer is not provided return
        if(toggleDrawer === undefined) return;
        const addButton = document.querySelectorAll('#add-new-note');
        // add event listener to call the toggle drawer
        addButton[1].addEventListener('click', () => {
            toggleDrawer();
        });

    }, [toggleDrawer])

    return (
        <div className={classes.panelHeaderContainer}>
            <Typography variant="h5" align="center" color="primary">Notes</Typography>
            <IconButton className={classes.addButton} color="primary" size="medium" id="add-new-note" component={RouterLink} to="/new" ><AddIcon style={{fontSize: '2rem'}}/></IconButton>
        </div>
    )
};

export default NotesPanelHeader;
