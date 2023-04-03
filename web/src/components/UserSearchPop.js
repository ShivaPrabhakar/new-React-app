import React, { useMemo, useState} from "react";

import { fade, makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import clsx from 'clsx';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import axios from 'axios';
import Cookies from 'universal-cookie';
import ListRendering from './ListRendering';
import constants from '../constants';
import Menu from '@material-ui/core/Menu';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Popup from './Popup';

const cookies = new Cookies();
const token = cookies.get('w_authExp');
function rand() {
  return Math.round(Math.random() * 20) - 10;
}
const config = {
  headers:{
    "Content-Type":"application/json",
    "Cookie": "w_authExp="+token+"; w_auth="+token+";"
  }
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
    width: '400',
    position: "absolute",
    border: "2px solid #000",
    marginLeft: "50px",
    "background-color": "white"
  };
}

function getButtonStyle() {
  return {
    marginLeft: "100px"
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "relative",
    width: '400',
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    marginLeft: theme.spacing(30)
  },
  button: {
    marginLeft: theme.spacing(10)
  },
  popupBox: {
    position: "fixed",
    backgroundColor: fade(theme.palette.common.white, 0.5),
    width: "100%",
    height: "100vh",
    top: "0",
    left: "0",
  },
box: {
  position: "relative",
  width: "70%",
  margin: `0 auto`,
  height: "auto",
  maxHeight: "70vh",
  marginTop: `calc(100vh - 85vh - 20px)`,
  backgroundColor: theme.palette.background.paper,
  borderRadius: "4px",
  padding: "20px",
  border: "1px solid #999",
  overflow: "auto",
},

closeIcon: {
  content: "x",
  cursor: "pointer",
  position: "fixed",
  right: `calc(15% - 30px)`,
  top: `calc(100vh - 85vh - 33px)`,
  backgroundColor: fade(theme.palette.common.white, 0.5),
  width: "25px",
  height: "25px",
  borderRadius: "50%",
  lineHeight: "20px",
  textAlign: "center",
  border: "1px solid #999",
  fontSize: "20px",
},

suggestionItem: {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center"
},

arrowImage: {
  height: "14px",
  cursor: "pointer"
},


suggestionName: {
  fontSize: "20px",
  fontFamily: 'roboto',
  color: "#64748b"
},

googleSuggestionsContainer: {
  width: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "left",
  alignItems: "left",
  height: "60vh",
  // float: "right",
},

suggestionContainer: {
  width: "100%",
  maxWidth: "200px",
  borderRadius: "10px",
  boxShadow: "0px 4px 16px 0px #bfbfbf",
  paddingLeft: "18px",
  paddingRight: "18px",
  paddingTop: "24px",
  paddingBottom: "8px",
},

inputContainer: {
  display: "flex"
},

suggestionsList: {
  paddingLeft: "0px"
}



}))
const UserSearchPop = (props) => {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [buttonStyle] = React.useState(getButtonStyle);
  const [token] = React.useState({
    token: cookies.get('w_authExp')
  })
  const menuId = 'primary-search-account-menu';
  const [anchorEl, setAnchorEl] = React.useState(0);
  const [obj, setObj] = React.useState(props.searchUsers.length > 0 ? {} : 0);
  const [isObj, setIsObj] = React.useState(false);
  const list = props.searchUsers;
  const type = constants.LIST_TYPES.USERS;
  const [isOpen, setIsOpen] = useState(true);
 
  const togglePopup = () => {
    setIsOpen(!isOpen);
  }
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handlePopup = () => {
    setIsOpen(true)
    console.log("isOpen ::",isOpen);
    // let k = useMemo(event);

    if(props.searchUsers.length > 0) {
      console.log("in setting ",props.searchUsers.length,(props.searchUsers.length > 0));
      // setObj(event);
    }
    if(obj && (obj._id !== null || obj._id !== undefined)) {
      console.log("in returning popup");
        return (<Popup
          name={obj.name}
          id={obj._id}
          type={type}
          handleClose={togglePopup}
          open={isOpen}
        />)
    } else {
      return () => {}
    }
    // return () => {openPopup(event)};
  }
  const isMenuOpen = Boolean(anchorEl);
//   const txt = "Do you what to add " + props.name + " as friend?";
  const addAsFriend = async () => {
    const id = props.id;
    try {
        const res = await axios.post('/add/friend', {_user: id}, config);
        if(res.data.success) {
            alert("Added friend successfully");
        } else {
          alert("Error while adding friend");
        }
    } catch (error) {
        alert("Error while adding friend",error);
    }
    props.handleClose();
  }
 

  const openPopup = () => {
    
    // return () => {?
      console.log("obj ::",obj,type,isOpen);
      
      return (<Popup
              name={obj.name}
              id={obj._id}
              type={type}
              handleClose={togglePopup}
              open={isOpen}
            />)
        
      
    //}
  }
  console.log("list :",props.searchUsers);
  return (
    <div className={clsx([classes.googleSuggestionsContainer])}>
     
      <div className={clsx([classes.suggestionContainer])}>
        <div className={clsx([classes.inputContainer])}>
          
        </div>
        <ul className={clsx([classes.suggestionsList])}>
          {list.map(each => (
            <li className={clsx([classes.suggestionItem])} id={each._id} onClick={() => { setIsObj(true); setObj(each); handlePopup()}}>
              <p className={clsx([classes.suggestionName])}>{each.name}</p>
              <img
                className="arrow-image"
                src={each.img}
              />
            </li>
            
          ))}
        </ul>
      </div>
      {isObj && <Popup
              name={obj.name}
              id={obj._id}
              type={type}
              handleClose={togglePopup}
              open={isOpen}
            />

      }
    </div>
  )
};
 
export default UserSearchPop;