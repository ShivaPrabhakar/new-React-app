import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import clsx from 'clsx';
import Cookies from 'universal-cookie';
import axios from 'axios';
 import { useHistory } from 'react-router-dom';
// import { Redirect } from 'react-router'

const cookies = new Cookies();



const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  // menuButton: {
  //   marginRight: theme.spacing(2),
  // },
  // title: {
  //   display: 'none',
  //   [theme.breakpoints.up('sm')]: {
  //     display: 'block',
  //   },
  // },
  root: {
    flexGrow: 1,
    margin: theme.spacing(0)
  },
  title: {
    flexGrow: 1,
  },
  margin:{
      margin: theme.spacing(0)
  },
  chatbtn:{
      size: '7ch'
  }
}));

export default function ButtonAppBar() {
  // 
 let history = useHistory();


 const classes = useStyles();
 const [anchorEl, setAnchorEl] = React.useState(null);

 const isMenuOpen = Boolean(anchorEl);

 const handleProfileMenuOpen = (event) => {
   setAnchorEl(event.currentTarget);
 };

 

 const handleMenuClose = () => {
  setAnchorEl(null);
};



 const menuId = 'primary-search-account-menu';
 

 const [token] = useState({
  token: cookies.get('w_authExp')
})
 // const classes = useStyles();
// console.log(token);

const config = {
  headers:{
    "Content-Type":"application/json"
  }
}

const logoutFun = async () =>{
  // console.log("in onclick");
  const res = await axios.post('/api/logout',config);
  // console.log("res == ",res.data.logout);
  if(res.data.logout)
    history.push("/home");
//  console.log("in ret");


}

const renderMenu = (
  <Menu
    anchorEl={anchorEl}
    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    id={menuId}
    keepMounted
    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
    open={isMenuOpen}
    onClose={handleMenuClose}
  >
    <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
    <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    <MenuItem onClick={logoutFun}>LogOut</MenuItem>
  </Menu>
);

 const setBth = () =>{
  if(token.token === ""){
    return(
      <div className={clsx([classes.root,classes.margin])}>
        <AppBar className={classes.margin} position="fixed">
          <Toolbar>
              <Typography variant="h6" className={classes.title}>
              <Button size={"large"} disableRipple disableFocusRipple disableElevation href={'/home'} color="inherit"><strong className={classes.chatbtn} >ChatApp</strong></Button>
              </Typography>
              <Button disableRipple disableFocusRipple disableElevation href={'/home'} color="inherit">Home</Button>
              <Button disableRipple disableFocusRipple disableElevation href={'/register'} color="inherit">Register</Button>
              <Button disableRipple disableFocusRipple disableElevation href={'/login'} color="inherit">Login</Button>    
          </Toolbar>
        </AppBar>
      </div>
    );
  }
  else{
    return(
      <div className={clsx([classes.root,classes.margin])}>
        <AppBar className={classes.margin} position="fixed">
          <Toolbar>
              <Typography variant="h6" className={classes.title}>
              <Button size={"large"} disableRipple disableFocusRipple disableElevation href={'/home'} color="inherit"><strong className={classes.chatbtn} >ChatApp</strong></Button>
              </Typography>
              
              <div className={classes.sectionDesktop}>
                  <IconButton
                    edge="end"
                    aria-label="account of current user"
                    aria-controls={menuId}
                    aria-haspopup="true"
                    onClick={handleProfileMenuOpen}
                    color="inherit"
                  >
                    <AccountCircle />
                  </IconButton>
              </div>
          
          </Toolbar>
        </AppBar>
        {renderMenu}
      </div>
    );
  }
 }

  return (
    setBth()
  );
}
