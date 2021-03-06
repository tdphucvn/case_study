import React from 'react';
import NotesPanel from '../components/note/NotesPanel';
import NoteNavigation from '../components/note/NoteNavigation';
import NoteContainer from '../components/note/NoteContainer';
import GetStarted from '../components/note/GetStarted';

// Private route is used to display the note editor - accessible only if the client is authenticated
import PrivateRoute from '../routes/PrivateRoute';

import { Route, Switch } from 'react-router-dom';

import { Grid, makeStyles } from '@material-ui/core';
 
const useStyles = makeStyles((theme) => ({
    container: {
        backgroundColor: theme.palette.primary.light,
        [theme.breakpoints.down('sm')]: {
            display: 'block',
        },
    },
    editor: {
        [theme.breakpoints.down('sm')]: {
            height: '100vh',
            overflow: 'auto'
        },
    },
}));

const NotePage = () => {
    const classes = useStyles();

    return (
        <Grid container className={classes.container}>
            <Grid item lg={3} md={4} sm={12}>
                <NotesPanel />
            </Grid>
            <Grid item lg={9} md={8} sm={12} className={classes.editor}>
                <NoteNavigation />
                <Switch>
                    <PrivateRoute exact path="/:id" component={NoteContainer} />
                    <Route path="/" component={GetStarted} />
                </Switch>
            </Grid>
        </Grid>
    )
};

export default NotePage;
