import React from "react";

import { fade, makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import clsx from 'clsx';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import Cookies from 'universal-cookie';

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
}
}))
const Popup = (props) => {
  const classes = useStyles;
  const [modalStyle] = React.useState(getModalStyle);
  const [buttonStyle] = React.useState(getButtonStyle);
  const [token] = React.useState({
    token: cookies.get('w_authExp')
  })

  const txt = "Do you what to add " + props.name + " as friend?";
  console.log("txt ::",txt,props);
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
  return (
    
    <Modal
        className={clsx([classes.popupBox])}
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
       
      <div className={clsx([classes.paper])} style={modalStyle} >
        <h2>{txt}</h2>
        <Button style={buttonStyle} variant="contained" color="secondary" onClick={props.handleClose}>
          No
        </Button>
        <Button className={classes.button} style={buttonStyle} variant="contained" color="primary" onClick={addAsFriend}>
          Yes
        </Button>
        
      </div>
    </Modal>
   
  );
  
};
 
export default Popup;