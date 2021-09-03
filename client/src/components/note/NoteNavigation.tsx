import React from 'react';
import { Button, IconButton, Typography, makeStyles, Container } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutRequest } from '../../redux/reducers/authenticate'; 
import { changeMode } from '../../redux/reducers/mode';
import { AppDispatch } from '../../redux/store';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

import Brightness2Icon from '@material-ui/icons/Brightness2';
import Brightness7Icon from '@material-ui/icons/Brightness7';


const useStyles = makeStyles((theme) => ({
    navigationContainer: {
        display: 'flex',
        height: '10%',
        alignItems: 'center',
        maxWidth: 'none',
    },
    grow: {
        flexGrow: 1,
    },
    authenticationButton: {
        width: '100px',
        marginLeft: theme.spacing(3),
    }
}));

const NoteNavigation = () => {
    const classes = useStyles();
    const dispatch = useDispatch<AppDispatch>();
    const { authenticated } = useSelector((state: RootState) => state.auth);
    const { lightMode } = useSelector((state: RootState) => state.mode);

    const handleLogOut = () => {
        dispatch(logoutRequest({message: "Logout request"}))
            .then(res => console.log(res));
    };

    const handleChangeMode = () => {
        dispatch(changeMode())
    };

    return (
        <Container className={classes.navigationContainer}>
            <Typography variant="h4" color="primary">Awesome Notepad</Typography>
            <div className={classes.grow}>
            </div>
            <div>
                <IconButton onClick={handleChangeMode} >
                    {lightMode ? <Brightness2Icon color="primary"/> : <Brightness7Icon color="primary"/>}
                </IconButton>
                {!authenticated ? 
                    <Button color="primary" variant="contained" className={classes.authenticationButton} component={RouterLink} to="/login">Login</Button>
                    :
                    <Button color="primary" variant="contained" className={classes.authenticationButton} onClick={handleLogOut}>Log Out</Button>
                }
            </div>
        </Container>
    )
};

export default NoteNavigation;
