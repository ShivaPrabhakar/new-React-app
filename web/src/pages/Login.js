import React,{useState} from 'react';
import axios from 'axios';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import Button from '@material-ui/core/Button';
import LockOpenRoundedIcon from '@material-ui/icons/LockOpenRounded';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    margin:theme.spacing(50),
  },
  margin: {
    margin: theme.spacing(20),
    marginLeft: theme.spacing(58),
  
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: '40ch',
  },
  login:{
    marginBottom: theme.spacing(3),
    marginLeft: theme.spacing(1),
  }
}));

const Login = ()=> {
  const classes = useStyles();
  const [user,SetUser] = useState({
    logusername:'',
    logpassword:'',
    showPassword: false,
  })
 // const {logusername,logpassword,showPassword} = user;

  const config = {
    headers:{
      "Content-Type":"application/json"
    }
  }

  const onChange = (e)=> SetUser({...user, [e.target.name]: e.target.value.trim()});

  // const handleChange = (prop) => (event) => {
  //   setValues({ ...values, [prop]: event.target.value });
  // };

  const handleClickShowPassword = () => {
    SetUser({ ...user, showPassword: !user.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const loginFun = async (e) =>{
   
    e.preventDefault()
    var data = {
      logusername:user.logusername,
      logpassword:user.logpassword
    }
    const res = await axios.post('/api/login',data,config);
    console.log(res);
    if(res.data.login){
      console.log("login successfull");
    }
    else{
      console.log("loign failed");
    }
  }

  return (
    <div  className={clsx(classes.margin)}>
    <Typography variant="h4" component="h2" align="left" className={classes.login}>
      Login
    </Typography>
    <FormControl className={classes.textField} variant="outlined" onSubmit={loginFun}>
     
      <InputLabel htmlFor="logusername"></InputLabel>
      <TextField
      onChange={onChange}
      id='logusername'
      required
      name='logusername'
      label="Username"
      value={user.logusername}
      placeholder='username'
      variant="outlined"
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <AccountCircleRoundedIcon />
          </InputAdornment>
        ),
      }}
    />
      <br></br>
      <InputLabel htmlFor="logpassword"></InputLabel>
      <TextField

      id='logpassword'
      required
      name='logpassword'
      label="Password"
      placeholder='password'
      variant="outlined"
            type={user.showPassword ? 'text' : 'password'}
            value={user.logpassword}
            onChange={onChange}
            
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {user.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
              ),
            }}
          
            labelWidth={70}
          />
      <br></br>
      <Button variant="contained" color="primary" endIcon={<LockOpenRoundedIcon/>}onClick={loginFun}>
  Login
</Button>
      </FormControl>
    </div>
  );
}

export default Login;
