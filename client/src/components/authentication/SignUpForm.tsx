import React, {useState} from 'react';
import { Typography, Avatar, Button, TextField, Grid, makeStyles, Container } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Link as RouterLink, } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { registerRequest } from '../../redux/reducers/authenticate'; 
import { AppDispatch } from '../../redux/store';
import { useHistory } from 'react-router';
import clsx from 'clsx';


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
    width: '100%',
    marginTop: theme.spacing(3),
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
  root: {
    backgroundColor: '#009788',
    color: 'white',
    '&:hover': {
        backgroundColor: '#009788',
    },
  }
}));

type ErrorMessage = {
  error: boolean;
  message: string;
};


const RegisterForm = () => {
  const [password, setPassword] = useState<string>('');
  const [matchingPasswords, setMatchingPasswords] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<ErrorMessage>({error: false, message: ''});
  const classes = useStyles();
  const dispatch = useDispatch<AppDispatch>();
  const history = useHistory();

  // handle register request function
  const handleRegisterRequest = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    
    // if the passwords do not match display the error and return
    if(!matchingPasswords) { setErrorMessage({error: true, message: 'Passwords do not match!'}); return; };
    
    // creating the target object witht values
    const target = e.target as typeof e.target & {
      firstName: { value: string };
      lastName: { value: string };
      username: { value: string };
      email: { value: string };
      password: { value: string };
      comfirmpassword: { value: string};
    };

    const email = target.email.value;
    const firstName = target.firstName.value;
    const lastName = target.lastName.value;
    const username = target.username.value;
    const password = target.password.value;

    // if any of the fields is not filled
    if(email === '' || firstName === '' || lastName === '' || username === '' || password === '')
    { setErrorMessage({error: true, message: 'Fields are requried!'}); return; };

    const confirmpassword = target.comfirmpassword.value;
    if(password !== confirmpassword) { setErrorMessage({error: true, message: 'Passwords do not match'}); return; };

    // call API request to register
    dispatch(registerRequest({username, password, email, firstName, lastName}))
      .then((res: any) => {
        const { message, status } = res.payload;
        // if something went wrong display error message
        if(status === 400) {setErrorMessage({error: true, message: message}); return; };
        // after being successfuly registered redirect to the index page
        history.push('/');
      })
      .catch((err) => console.log(err));
  };

  // on confirm password change check if the passwords are matching
  const handleMatchingPasswords = (e: React.ChangeEvent<HTMLInputElement>) => {
    const confirmPassword = e.target.value;
    if(confirmPassword !== password){ setMatchingPasswords(false); return};
    setMatchingPasswords(true);
  };

  return (
    <Container component="main" maxWidth="xs" className={classes.container}>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        {errorMessage.error && <Typography color="error" align="center" variant="body1">{errorMessage.message}</Typography>}
        <form className={classes.form} noValidate onSubmit={handleRegisterRequest}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField autoComplete="fname" name="firstName" variant="outlined" required fullWidth id="firstName" label="First Name" autoFocus />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField variant="outlined" required fullWidth id="lastName" label="Last Name" name="lastName" autoComplete="lname" />
            </Grid>
            <Grid item xs={12}>
              <TextField variant="outlined" required fullWidth id="username" label="Username" name="username" type="text" />
            </Grid>
            <Grid item xs={12}>
              <TextField variant="outlined" required fullWidth id="email" label="Email Address" name="email" autoComplete="email" />
            </Grid>
            <Grid item xs={12}>
              <TextField variant="outlined" required fullWidth name="password" label="Password" type="password" id="password" autoComplete="current-password" onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setPassword(e.target.value)}}/>
            </Grid>
            <Grid item xs={12}>
              <TextField error={!matchingPasswords} variant="outlined" required fullWidth name="comfirmpassword" label="Confirm Password" type="password" id="confirmpassword" onChange={handleMatchingPasswords}/>
            </Grid>
          </Grid>
          <Button type="submit" fullWidth variant="contained" className={clsx(classes.submit, classes.root)} >
            Sign Up
          </Button>
          <Grid container>
            <Grid item>
              <RouterLink to="/login" className={classes.link}>
                <Typography variant="body2">Already have an account? Sign in</Typography>
              </RouterLink>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default RegisterForm;