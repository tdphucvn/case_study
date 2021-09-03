import React from 'react';
import { Grid, TextField, InputAdornment, makeStyles } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
    searchBarContainer: {
        width: '100%',
        height: '10%',
    },
    searchBar: {
        width: '80%',
        margin: 'auto',
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    }
}));

const SearchBar = () => {
    const classes = useStyles();
    
    return (
        <Grid container className={classes.searchBarContainer}>
            <TextField 
                className={classes.searchBar}
                id="search-input"
                placeholder="Search..."
                variant="outlined"
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    )
                }}
            />
        </Grid>
    )
};

export default SearchBar;
