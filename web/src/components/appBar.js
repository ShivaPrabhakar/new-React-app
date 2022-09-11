import React, { useState } from 'react';
import { fade,makeStyles,createMuiTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
// import createTheme from '@material-ui/core'
import axios from 'axios'

import clsx from 'clsx';
import Cookies from 'universal-cookie';
 import { useHistory } from 'react-router-dom';
// import { Redirect } from 'react-router'

import ListRendering from './ListRendering'
import constants from '../constants';
import UserSearchPop from './UserSearchPop';
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
      margin: theme.spacing(0),
    zIndex: theme.zIndex.drawer + 1,

  },
  chatbtn:{
      size: '7ch'
  },
  inputRoot: {
    color: 'inherit',
    
  },
  user: {
    position: 'relative',

    flexGrow: 1,
    marginLeft: theme.spacing(1000),
    zIndex: theme.zIndex.drawer + 1,
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    width:'40%',
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.spacing(10),
      marginLeft: theme.spacing(90),
      width: '30%',
    },
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '40%',
    [theme.breakpoints.up('md')]: {
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '20%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: '20%',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
}));

export default function ButtonAppBar(props) {
  // 
 let history = useHistory();


 const classes = useStyles();
 const [anchorEl, setAnchorEl] = React.useState(0);
 const [searchRes,setSearchResult] = React.useState(0);
 const [searchUsers, setSearchUsers] = React.useState([]);




 const isMenuOpen = Boolean(anchorEl);

 const handleProfileMenuOpen = (event) => {
   setAnchorEl(event.currentTarget);
 };

 

 const handleMenuClose = () => {
  setAnchorEl(null);
};

React.useEffect(() => {
  console.log("on schange list");
  renderSearchUsersList();
}, [searchUsers]);


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

const onChange = async(e) => {setSearchResult({...searchRes, searchRes:e.target.value.trim()})
console.log(searchRes);
let searchText = searchRes.searchRes;
  let res = await axios.get('/search',{params:{searchText}});
  console.log("res in appbar :",res);
  if(res.data.users && res.data.users.length > 0) {
    setSearchUsers(res.data.users);
  }
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

const renderSearchUsersList = () => {
  console.log("in renderSearchUsersList",searchUsers);
  if(searchUsers.length > 0) {
    return (
      <UserSearchPop searchUsers={searchUsers}/>
    )
  }
}

const renderSearch = (
  <div className={classes.search}>
  <div className={classes.searchIcon}>
    <SearchIcon />
  </div>
  <InputBase
    placeholder="Search…"
    classes={{
      root: classes.inputRoot,
      input: classes.inputInput,
    }}
    inputProps={{ 'aria-label': 'search' }}
    onChange = {onChange}
  />
   
</div>
);



 const setBth = () =>{
  if(token.token === "" || token.token === undefined ){
    return(
      <div className={clsx([classes.root,classes.margin])}>
        <AppBar className={classes.margin} position="fixed">
          <Toolbar>
              <Typography variant="h6" className={classes.title}>
              <Button size={"large"} disableRipple disableFocusRipple disableElevation href={'/home'} color="inherit"><strong className={classes.chatbtn} >ChatApp</strong></Button>
              </Typography>
              {renderSearch}
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
      <React.Fragment>
        <div className={clsx([classes.root,classes.margin])}>
          <AppBar className={classes.margin} position="fixed">
            <Toolbar>
                <Typography variant="h6" className={classes.title}>
                <Button size={"large"} disableRipple disableFocusRipple disableElevation href={'/home'} color="inherit"><strong className={classes.chatbtn} >ChatApp</strong></Button>
                </Typography>
                {renderSearch}
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
          {searchUsers.length > 0 && (
                <div className={clsx([ classes.user,classes.root])}>
                    <UserSearchPop searchUsers={searchUsers}/>
                </div>
            )
          }
        </div>
        
      </React.Fragment>
    );
  }
 }

  return (
    setBth()
  );
}
