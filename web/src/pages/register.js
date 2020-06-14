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
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';
import PersonRoundedIcon from '@material-ui/icons/PersonRounded';
import EmailRoundedIcon from '@material-ui/icons/EmailRounded';
import FlashMassage from 'react-flash-message';
import { useHistory } from 'react-router-dom';
import ButtonAppBar from './../components/appBar';

//import Login from './Login';

// inside render

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    margin:theme.spacing(15),
  },
  margin: {
    margin: theme.spacing(5),
    marginLeft: theme.spacing(58),
    marginTop: theme.spacing(12)
  
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: '40ch',
    height: '1ch'
  },
  login:{
    marginBottom: theme.spacing(3),
    marginLeft: theme.spacing(1),
  }
}));

const Register = ()=> {
  let history = useHistory();

  const classes = useStyles();
  const [user,SetUser] = useState({
    name:'',
    email:'',
    username:'',
    password:'',
    password2:'',
    showPassword: false,
  })
 // const {name,email,username,password,password2,showPassword} = user;

  const Message = (msg) => (
    <FlashMassage duration={5000}>
      <strong>msg</strong>
    </FlashMassage>
  )

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

  const validateEmail= (email) => {
    var re = new RegExp("^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,5})$");
    if(!re.test(email)){
        console.log("not email");
    }

    return re.test(email);
  }
  const validate = () =>{
      var emailVal = false;
      var nameVal = true;
      var usernameVal = true;
      var passwordVal = true;
      var password2Val = true;
      var passwordMatch = false;

      if(user.email === ''){
          Message("Email required");
          console.log("Email required");
      }
      else{

        emailVal = validateEmail(user.email);
      }
      if(user.name === ''){
        Message("Name required");
        console.log("Name required");
        nameVal = false;
      }
      if(user.username === ''){
        Message("Username required");
        console.log("Username required");
        usernameVal = false;
      }
      if(user.password === ''){
        Message("Password required");
        console.log("Password required");
        passwordVal = false;
      }
      if(user.password2 === ''){
        Message("Password2 required");
        console.log("Password2 required");
        password2Val = false;
      }
      if(user.password.length <= 8){
        console.log("Minimum password length is 8");
          passwordVal = false;

      }
      if(user.password2.length <=8 ){
        console.log("Minimum password length is 8");
        password2Val = false;
      }
      if(passwordVal && password2Val){
          if(user.password === user.password2){
              passwordMatch = true;
          }
          else{
            console.log("Passwords do not match.");
          }
      }
      if(emailVal){
          if(nameVal){
              if(usernameVal){
                    if(passwordVal && password2Val){
                        if(passwordMatch){
                            return true;
                        }
                        else{
                            return false;
                        }
                    }
                    else{
                        return false;
                    }
              }
              else{
                return false;
              }
          }
          else{
            return false;
          }
      }
      else{
          return false;
      }
        
  }

const isEmailExists = async (email) =>{
    const res = await axios.post('/api/emailExist',{email:email},config);
    if(res.data.exist){
        console.log("email exists");
        return true;
    }
    else{
        return false;
    }
}

const isUsernameExists = async (username) =>{
    const res = await axios.post('/api/usernameExist',{username:username},config);
    if(res.data.exist){
        console.log("username exists");
        return true;
    }
    else{
        return false;
    }
}

  const registerFun = async (e) =>{
    e.preventDefault()
    var validate1 =  validate();
    if(validate1){
       // console.log( await isEmailExists(user.email) === false)
        if(await isEmailExists(user.email) === false){
            console.log("email does not exist")
            validate1 = true;
        }
        else{
            console.log("email exist")

            validate1 = false;   
        }
        if(validate1){
           // console.log(await isUsernameExists(user.username) === false)
            if(await isUsernameExists(user.username) === false){
                console.log("username does not exist")
                validate1 = true;
            }
            else{
                console.log("username exist")

                validate1 = false;   
            }
        }
    }
     console.log(validate1);
    var data = {
      name:user.name,
      email:user.email,
      username:user.username,
      password:user.password,
      password2:user.password2,
    }
    
    if(validate1){
        const res = await axios.post('/api/register',data,config);
        // console.log(res);
        if(res.data.Signup){
          console.log("register successfull");
          history.push("/login");
        }
        else{
        console.log("register failed");
        }
    }
    else{
        return false;
    }
  }

  return (
    <React.Fragment>
    <ButtonAppBar/> 
    <div  className={clsx(classes.margin)}>
    <Typography variant="h4" component="h2" align="left" className={classes.login}>
      Register
    </Typography>
    <FormControl className={classes.textField} variant="outlined" onSubmit={registerFun}>
    <InputLabel htmlFor="name"></InputLabel>
    <TextField
    onChange={onChange}
    id='standard-required'
    required='true'
    name='name'
    label="Name"
    value={user.name}
    placeholder='name'
    variant="outlined"
    InputProps={{
      endAdornment: (
        <InputAdornment position="end">
          <PersonRoundedIcon />
        </InputAdornment>
      ),
    }}
  />
    <br></br>
    <InputLabel htmlFor="email"></InputLabel>
    <TextField
    onChange={onChange}
    id='standard-required'
    required='true'
    name='email'
    label="Email"
    type="email"
    value={user.email}
    placeholder='email'
    variant="outlined"
    InputProps={{
      endAdornment: (
        <InputAdornment position="end">
          <EmailRoundedIcon />
        </InputAdornment>
      ),
    }}
  />
    <br></br>
      <InputLabel htmlFor="username"></InputLabel>
      <TextField
      onChange={onChange}
      id='standard-required'
      required='true'
      name='username'
      label="Username"
      value={user.username}
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
      <InputLabel htmlFor="password"></InputLabel>
      <TextField

      id='standard-required'
      required='true'
      name='password'
      label="Password"
      placeholder='password'
      variant="outlined"
            type={user.showPassword ? 'text' : 'password'}
            value={user.password}
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
      <InputLabel htmlFor="password2"></InputLabel>
      <TextField

      id='standard-required'
      required='true'
      name='password2'
      label="Password Check"
      placeholder='Re-enter password'
      variant="outlined"
            type={'password'}
            value={user.password2}
            onChange={onChange}
            
            
          
            labelWidth={70}
          />
          <br></br>
      <Button variant="contained" color="primary" endIcon={<ExitToAppRoundedIcon/>}onClick={registerFun}>
      Register
</Button>
      </FormControl>
    </div>
    </React.Fragment>
  );
}

export default Register;
