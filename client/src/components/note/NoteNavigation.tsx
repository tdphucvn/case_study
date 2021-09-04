import React, { useState } from 'react';
import { Button, IconButton, Typography, makeStyles, Container } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutRequest } from '../../redux/reducers/authenticate'; 
import { changeMode } from '../../redux/reducers/mode';
import { AppDispatch } from '../../redux/store';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { cleanNotes } from '../../redux/reducers/notes';

import Brightness2Icon from '@material-ui/icons/Brightness2';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

import withWidth from '@material-ui/core/withWidth';
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints';

import DrawerNavigation from './DrawerNavigation';

const useStyles = makeStyles((theme) => ({
    navigationContainer: {
        display: 'flex',
        height: '10%',
        alignItems: 'center',
        maxWidth: 'none',
        [theme.breakpoints.down('sm')]: {
            height: 'auto',
            minHeight: '10%',
        }
    },
    grow: {
        flexGrow: 1,
    },
    authenticationButton: {
        width: '100px',
        marginLeft: theme.spacing(3),
    },
}));

const NoteNavigation = (props: {width: Breakpoint}) => {
    const classes = useStyles();
    const dispatch = useDispatch<AppDispatch>();
    const [drawer, setDrawer] = useState<boolean>(false);
    const { authenticated } = useSelector((state: RootState) => state.auth);
    const { lightMode } = useSelector((state: RootState) => state.mode);

    const handleLogOut = () => {
        dispatch(logoutRequest({message: "Logout request"}))
            .then(res => console.log(res))
            .then(() => dispatch(cleanNotes()));
    };

    const handleChangeMode = () => {
        dispatch(changeMode())
    };


    return (
        <Container className={classes.navigationContainer}>
            {props.width === 'sm' || props.width === "xs" ? <IconButton color="primary" onClick={() => setDrawer(previousState => !previousState)}><ArrowBackIosIcon /></IconButton> : <Typography variant="h4" color="primary">Awesome Notepad</Typography>}
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
            {props.width === 'sm' || props.width === "xs" ? <DrawerNavigation drawer={drawer} setDrawer={setDrawer}/> : null}
        </Container>
    )
};

export default withWidth()(NoteNavigation);
