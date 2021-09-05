import React, {useEffect, useState} from 'react';
import { INote } from './NotesPreviewContainer';
import { Container, Typography, makeStyles, Card, CardHeader, CardContent } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';

import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
interface IProps {
    note: INote;
};

const useStyles = makeStyles((theme) => ({
    notePreviewContainer: {
        margin: '20px 0',
        padding: '0',
        textDecoration: 'none',
        color: 'black'
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

}));

const NotePanelPreview = (props: IProps) => {
    const classes = useStyles();
    const note = props.note;
    const [active, setActive] = useState<boolean>(false);
    const { activeNote } = useSelector((state: RootState) => state.notes);

    useEffect(() => {
        // if the certain note is active
        if(activeNote === note) {
            setActive(true);
            return;
        };   
        setActive(false);
    }, [activeNote, note]);

    // creating published date value
    const date = new Date(note.date);
    // if the minutes are less than 10 add aditional '0'
    const getFullMinutes = (min: number) => {
        if(min < 10) return '0'+ min;
        return min; 
    };
    const publishedDate = date.getDate() + '.' + date.getMonth() + '.' + date.getFullYear() + ' ' + date.getHours() + ':' + getFullMinutes(date.getMinutes());

    return (
        <Container className={classes.notePreviewContainer} component={RouterLink} to={`${note._id}`}>
            <Card elevation={3} className={clsx(classes.noteCard, active ? classes.activeLink : null)}>
                <CardHeader 
                    title={note.title.length > 20 ? note.title.substring(0,17) + '...' : note.title}
                    subheader={publishedDate}
                />
                <CardContent className={classes.noteContent}>
                    <Typography variant="body2" color="textPrimary">{note.preview.length > 150 ? note.preview.substring(0, 147) + '...' : note.preview}</Typography>
                </CardContent>
            </Card>
        </Container>
    )
};

export default NotePanelPreview;
