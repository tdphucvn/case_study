import React, {useState} from 'react';
import { Typography, Avatar, Button, TextField, Grid, makeStyles, Container } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginRequest } from '../../redux/reducers/authenticate'; 
import { AppDispatch } from '../../redux/store';

const useStyles = makeStyles((theme) => ({
  container: {
    width: '100%',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center', 
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  link: {
    textDecoration: 'none',
    color: 'black',
    '&:hover': {
      color: '#587D9F',
    },
  },
}));

type ErrorMessage = {
  error: boolean;
  message: string;
};


const LoginForm = () => {
  // default state of a error message
  const [errorMessage, setErrorMessage] = useState<ErrorMessage>({error: false, message: ''});
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch<AppDispatch>();

  // handle login request function
  const handleLoginRequest = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    // create target object with the values from the form
    const target = e.target as typeof e.target & {
      username: { value: string };
      password: { value: string };
    };

    const username = target.username.value;
    const password = target.password.value;
    // if any of the fields are not filled
    if(username === '' || password === '')
    { setErrorMessage({error: true, message: 'Fields are requried'}); return; };
    
    // call the API request to login
    dispatch(loginRequest({username, password}))
      .then(res => {
        // if something went wrong display error message
        if(res.payload.status === 401) {setErrorMessage({error: true, message: res.payload.message}); return; };
        // after successfuly logging in redirect to the main page
        history.push('/');
      });
  };


  return (
    <Container component="main" maxWidth="xs" className={classes.container}>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        {errorMessage.error && <Typography color="error" align="center" variant="body1">{errorMessage.message}</Typography>}
        <form className={classes.form} noValidate onSubmit={handleLoginRequest}>
          <TextField variant="outlined" margin="normal" required fullWidth id="username" label="Username" type="text" name="username" autoFocus />
          <TextField variant="outlined" margin="normal" required fullWidth name="password" label="Password" type="password" id="password" autoComplete="current-password" />
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <RouterLink to="/signup" className={classes.link}>
                <Typography variant="body2">Don't have an account? Sign Up</Typography>
              </RouterLink>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default LoginForm;