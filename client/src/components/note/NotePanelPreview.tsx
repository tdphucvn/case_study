import React, {useEffect, useState} from 'react';
import { INote } from './NotesPreviewContainer';
import { Container, Typography, makeStyles, Card, CardHeader, CardContent, IconButton, CardActions } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';

import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { deleteNote } from '../../api/notesApi';
import { deleteNote as deleteNoteReducer } from '../../redux/reducers/notes';

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
        '&:hover': {
            boxShadow: '0px 4px 10px 0px rgba(0,0,0,0.64)',
        }
    },
    activeLink: {
        borderLeft: `7px solid ${theme.palette.primary.main}`,
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
    const dispatch = useDispatch<AppDispatch>();
    const [active, setActive] = useState<boolean>(false);
    const { accessToken } = useSelector((state: RootState) => state.auth);
    const { activeNote } = useSelector((state: RootState) => state.notes);

    useEffect(() => {
        if(activeNote === note) {
            setActive(true);
            return;
        };   
        setActive(false);
    }, [activeNote, note]);

    const date = new Date(note.date);
    const publishedDate = date.getDate() + '.' + date.getMonth() + '.' + date.getFullYear() + ' ' + date.getHours() + ':' + date.getMinutes();

    const handleDelete = () => {
        deleteNote(accessToken, note._id)
            .then(res => console.log(res))
            .then(() => {
                dispatch(deleteNoteReducer(props.note))
            })
            .catch((err) => console.log(err.message));
    };

    return (
        <Container className={classes.notePreviewContainer}>
            
            <Card elevation={3} className={clsx(classes.noteCard, active ? classes.activeLink : null)}>
                <CardHeader 
                    title={note.title.length > 20 ? note.title.substring(0,17) + '...' : note.title}
                    subheader={publishedDate}
                    component={RouterLink}
                    to={`${note._id}`}
                    className={classes.link}
                />
                <CardContent className={classes.noteContent}>
                    <Typography variant="body2" color="textPrimary" className={classes.link} component={RouterLink} to={`${note._id}`}>{note.preview.length > 150 ? note.preview.substring(0, 147) + '...' : note.preview}</Typography>
                </CardContent>
                <CardActions disableSpacing>
                    {/* <IconButton aria-label="add to favorites">
                        <FavoriteIcon color="primary" />
                    </IconButton> */}
                    <IconButton onClick={handleDelete}><DeleteIcon /></IconButton>
                </CardActions>
            </Card>
        </Container>
    )
};

export default NotePanelPreview;
