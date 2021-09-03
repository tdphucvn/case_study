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

const useStyles = makeStyles((theme) => ({
    toolBarContainer: {
        height: '10%',
        maxWidth: 'none',
        backgroundColor: '#F8F8F8',
        display: 'flex',
        alignItems: 'center'
    },
    grow: {
        flexGrow: 1,
    },
    saveButton: {
        width: '100px',
    },
    editButton: {
        '& .MuiIconButton-label':{
            pointerEvents: 'none'
        },
    }
}));

interface IProps {
    saveFunction: () => void;
}

const ToolBar = (props: IProps) => {
    const classes = useStyles();
    
    useEffect(() => {
        const editButtons = document.querySelectorAll('[data-edit]');
        const spans = document.querySelectorAll('[data-edit] .MuiIconButton-label');
        
        spans.forEach((span) => {
            const sp = span as HTMLElement;
            sp.style.pointerEvents = 'none';
        });

        editButtons.forEach(button => {
            const bt = button as HTMLButtonElement;
            if (bt.getAttribute('listener') !== 'true') {
                button.addEventListener('click', (e) => {
                    e.preventDefault();
                    const btn = e.target as HTMLElement;
                    const cmd_val = btn.getAttribute('data-edit').split(':');
                    document.execCommand(cmd_val[0], false, cmd_val[1]);
                });
            };
        });
    }, []);
    
    return (
        <Container className={classes.toolBarContainer}>
            <div style={{display: 'flex', alignItems: 'center'}}>
                <IconButton data-edit="bold" color="primary" className={classes.editButton}><FormatBoldIcon style={{fontSize: '1.5rem'}}/></IconButton>
                <IconButton data-edit="italic" color="primary" className={classes.editButton}><FormatItalicIcon style={{fontSize: '1.5rem'}}/></IconButton>
                <IconButton data-edit="underline" color="primary" className={classes.editButton}><FormatUnderlinedIcon style={{fontSize: '1.5rem'}}/></IconButton>
                <IconButton data-edit="justifyLeft" color="primary" className={classes.editButton}><FormatAlignLeftIcon style={{fontSize: '1.5rem'}}/></IconButton>
                <IconButton data-edit="justifyCenter" color="primary" className={classes.editButton}><FormatAlignCenterIcon style={{fontSize: '1.5rem'}}/></IconButton>
                <IconButton data-edit="justifyRight" color="primary" className={classes.editButton}><FormatAlignRightIcon style={{fontSize: '1.5rem'}}/></IconButton>
                <IconButton data-edit="justifyFull" color="primary" className={classes.editButton}><FormatAlignJustifyIcon style={{fontSize: '1.5rem'}}/></IconButton>
                <IconButton data-edit="insertUnorderedList" color="primary" className={classes.editButton}><FormatListBulletedIcon style={{fontSize: '1.5rem'}}/></IconButton>
                <IconButton data-edit="insertOrderedList" color="primary" className={classes.editButton}><FormatListNumberedIcon style={{fontSize: '1.5rem'}}/></IconButton>

                <DropdownButtons />
            </div>
            <div className={classes.grow}></div>
            <div>
                <Button color="primary" variant="contained" className={classes.saveButton} onClick={props.saveFunction}>Save</Button>
            </div>
        </Container>
    )
};

export default ToolBar;
