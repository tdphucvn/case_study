import React, { useCallback } from 'react';
import { Grid, TextField, InputAdornment, makeStyles } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

// import debounce to delay calling changeHandler function
import debounce from 'lodash.debounce';

const useStyles = makeStyles((theme) => ({
    searchBarContainer: {
        width: '100%',
        height: '10%',
    },
    searchBar: {
        width: '80%',
        margin: 'auto',
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
        backgroundColor: 'white',
        color: 'white'
    }
}));

interface IProps {
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
};

const SearchBar = (props: IProps) => {
    const classes = useStyles();
    
    // setting the search query
    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.setSearchQuery(event.target.value);
    };
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const debouncedChangeHandler = useCallback(
        // delay 300 ms before calling changeHandler
        debounce(changeHandler, 300)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    , []);

    return (
        <Grid container className={classes.searchBarContainer}>
            <TextField 
                className={classes.searchBar}
                id="search-input"
                placeholder="Search..."
                variant="outlined"
                onChange={debouncedChangeHandler}
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
