import React, {useState} from 'react';
import { Drawer, makeStyles } from '@material-ui/core';
import NotesPanelHeader from './NotesPanelHeader';
import SearchBar from './SearchBar';
import NotesPreviewContainer from './NotesPreviewContainer';

const useStyles = makeStyles((theme) => ({
    drawer: {
        width: '100vw',
        height: '100%',
    }
}));

type Props = {
    drawer: boolean;
    setDrawer: React.Dispatch<React.SetStateAction<boolean>>;
};


const DrawerNavigation = (props: Props) => {
    const classes = useStyles();
    const [drawer, setDrawer] = [props.drawer, props.setDrawer];
    const [searchQuery, setSearchQuery] = useState<string>('');

    const toggleDrawer = (open: boolean) => ( event: React.KeyboardEvent | React.MouseEvent ) => {
        if (
            event.type === 'keydown' &&
            ((event as React.KeyboardEvent).key === 'Tab' ||
            (event as React.KeyboardEvent).key === 'Shift')
        ) return;

        setDrawer(open);
    };

    // helper function to close the drawer
    const helperToggleDrawer = () => {
        setDrawer(false);
    };
 
    const list = () => (
        <div role="presentation" className={classes.drawer}>
            <NotesPanelHeader toggleDrawer={helperToggleDrawer}/>
            <SearchBar setSearchQuery={setSearchQuery}/>
            <div role="presentation" onClick={toggleDrawer(false)}>
                <NotesPreviewContainer searchQuery={searchQuery} />
            </div>
        </div>
    )

    return (
        <div>
          <Drawer anchor="left" open={drawer} onClose={toggleDrawer(false)}>
            {list()}
          </Drawer>
        </div>
    )
};

export default DrawerNavigation;