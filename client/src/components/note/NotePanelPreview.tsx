import React from 'react';
import { INote } from './NotesPreviewContainer';
import { Container, Typography, makeStyles, Card, CardHeader, CardContent, IconButton, CardActions } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';

import FavoriteIcon from '@material-ui/icons/Favorite';
import DeleteIcon from '@material-ui/icons/Delete';
interface IProps {
    note: INote;
};

const useStyles = makeStyles((theme) => ({
    notePreviewContainer: {
        margin: '20px 0',
        padding: '0',
    },
    noteCard: {
        borderLeft: `7px solid ${theme.palette.primary.main}`,
        '&:hover': {
            boxShadow: '0px 4px 10px 0px rgba(0,0,0,0.64)',
        }
    },
    noteContent: {
        padding: '0 16px',
    },
    link: {
        textDecoration: 'none',
        color: 'black'
    }
}));

const NotePanelPreview = (props: IProps) => {
    const classes = useStyles();
    const note = props.note;
    
    return (
        <Container className={classes.notePreviewContainer}>
            <Card elevation={3} className={classes.noteCard}>
                <CardHeader 
                    title={note.title.length > 20 ? note.title.substring(0,17) + '...' : note.title}
                    subheader={note.date}
                    component={RouterLink}
                    to={`${note.id}`}
                    className={classes.link}
                />
                <CardContent className={classes.noteContent}>
                    <Typography variant="body2" color="textPrimary" className={classes.link} component={RouterLink} to={`${note.id}`}>{note.content.length > 150 ? note.content.substring(0, 147) + '...' : note.content}</Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites">
                        <FavoriteIcon color="primary" />
                    </IconButton>
                    <IconButton><DeleteIcon /></IconButton>
                </CardActions>
            </Card>
        </Container>
    )
};

export default NotePanelPreview;
