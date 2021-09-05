import React from 'react';
import { Typography, makeStyles, Container, Button } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

const useStyles = makeStyles((theme) => ({
    getStartedContainer: {
        height: '90%',
        padding: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        [theme.breakpoints.down('xs')]: {
            padding: '0 5px'
        },
        color: theme.palette.common.black,
    },
}));

const GetStarted = () => {
    const classes = useStyles();
    const { authenticated } = useSelector((state: RootState) => state.auth);
    
    return (
        <Container className={classes.getStartedContainer}>
            <Typography variant="h6" align="center">Click on the button to get started with us!</Typography>
            <Typography variant="subtitle1" align="center" gutterBottom>Write down your thoughts...</Typography>
            <Button color="primary" variant="contained" component={RouterLink} to={authenticated ? '/new' : '/login'}>Get started</Button>
        </Container>
    )
}

export default GetStarted
