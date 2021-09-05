import React, {useEffect} from 'react';
import { Button, IconButton, makeStyles, Container } from '@material-ui/core';

import FormatBoldIcon from '@material-ui/icons/FormatBold';
import FormatItalicIcon from '@material-ui/icons/FormatItalic';
import FormatUnderlinedIcon from '@material-ui/icons/FormatUnderlined';
import FormatAlignJustifyIcon from '@material-ui/icons/FormatAlignJustify';
import FormatAlignLeftIcon from '@material-ui/icons/FormatAlignLeft';
import FormatAlignRightIcon from '@material-ui/icons/FormatAlignRight';
import FormatAlignCenterIcon from '@material-ui/icons/FormatAlignCenter';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';

import DropdownButtons from './DropdownButtons';
import { INote } from './NotesPreviewContainer';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
    toolBarContainer: {
        height: '10%',
        maxWidth: 'none',
        backgroundColor: theme.palette.primary.dark,
        display: 'flex',
        alignItems: 'center',
        [theme.breakpoints.down('md')]: {
            height: 'auto',
            minHeight: '10%',
        },
        [theme.breakpoints.down('xs')]: {
            display: 'block',
        }
    },
    grow: {
        flexGrow: 1,
        minWidth: '30px',
    },
    saveButton: {
        width: '100px',
        [theme.breakpoints.down('xs')]: {
            width: 64,
            fontSize: '0.7rem'
        }
    },
    editButton: {
        '& .MuiIconButton-label':{
            pointerEvents: 'none'
        },
    },
    editButtonsGroup: {
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap', 
        [theme.breakpoints.down('md')]: {
            maxWidth: '380px'
        }
    },
    buttonGroup: {
        [theme.breakpoints.down('md')]: {
            display: 'flex',
            // justifyContent: 'flex-end'
        },
        [theme.breakpoints.down('sm')]: {
            padding: '10px 0',
        },
    },
    root: {
        backgroundColor: '#009788',
        color: 'white',
        '&:hover': {
            backgroundColor: '#009788',
        },
    }
}));

interface IProps {
    saveFunction: () => void;
    deleteFunction: () => void;
    note: INote | null | undefined;
}

const ToolBar = (props: IProps) => {
    const classes = useStyles();
    
    // on component mount
    useEffect(() => {
        const editButtons = document.querySelectorAll('[data-edit]');
        const spans = document.querySelectorAll('[data-edit] .MuiIconButton-label');
        
        // disabling clicking on the span
        spans.forEach((span) => {
            const sp = span as HTMLElement;
            sp.style.pointerEvents = 'none';
        });

        // add event listener on click event
        editButtons.forEach(button => {
            const bt = button as HTMLButtonElement;
            // if the button doesn't have an event listener yet
            if (bt.getAttribute('listener') !== 'true') {
                button.addEventListener('click', (e) => {
                    e.preventDefault();
                    const btn = e.target as HTMLElement;
                    // get the command data from the button
                    const cmd_val = btn.getAttribute('data-edit').split(':');
                    // executing the command to format chosen text
                    document.execCommand(cmd_val[0], false, cmd_val[1]);
                });
            };
        });
    }, []);
    
    return (
        <Container className={classes.toolBarContainer}>
            <div className={classes.editButtonsGroup}>
                <IconButton data-edit="bold" color="primary" className={classes.editButton}><FormatBoldIcon/></IconButton>
                <IconButton data-edit="italic" color="primary" className={classes.editButton}><FormatItalicIcon/></IconButton>
                <IconButton data-edit="underline" color="primary" className={classes.editButton}><FormatUnderlinedIcon/></IconButton>
                <IconButton data-edit="justifyLeft" color="primary" className={classes.editButton}><FormatAlignLeftIcon/></IconButton>
                <IconButton data-edit="justifyCenter" color="primary" className={classes.editButton}><FormatAlignCenterIcon/></IconButton>
                <IconButton data-edit="justifyRight" color="primary" className={classes.editButton}><FormatAlignRightIcon/></IconButton>
                <IconButton data-edit="justifyFull" color="primary" className={classes.editButton}><FormatAlignJustifyIcon/></IconButton>
                <IconButton data-edit="insertUnorderedList" color="primary" className={classes.editButton}><FormatListBulletedIcon/></IconButton>
                <IconButton data-edit="insertOrderedList" color="primary" className={classes.editButton}><FormatListNumberedIcon/></IconButton>

                <DropdownButtons />
            </div>
            <div className={classes.grow}></div>
            <div className={classes.buttonGroup}>
                { props.note !== null && props.note !== undefined && <Button color="secondary" variant="contained" className={clsx(classes.saveButton, classes.root)} onClick={props.deleteFunction} style={{marginRight: 10}}>Delete</Button> }
                <Button color="primary" variant="contained" className={clsx(classes.saveButton, classes.root)} onClick={props.saveFunction}>Save</Button>
            </div>
        </Container>
    )
};

export default ToolBar;
