import React, { useState, useEffect } from 'react';
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import constants from '../constants';
import Popup from './Popup';
const useStyles = makeStyles((theme) => ({
    listbutton1: {
        height:50,
    },
    nothing:{
      marginTop:20
    }
  }));

  

const ListRendering = function (props) {
    const classes = useStyles;
    let {list, type} = props;
    console.log("list",list);
    const [isOpen, setIsOpen] = useState(false);
 
    const togglePopup = () => {
      setIsOpen(!isOpen);
    }
    
    if(list.length>0){
      console.log("in creating list");
      return (
        <React.Fragment>
            <List>      
            {list.map((obj, index) => (
                <React.Fragment>
              <ListItem button divider="true" classes={classes.listbutton1} key={obj._id} onClick={togglePopup} >
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={obj.name} />
                {isOpen && <Popup
                  name={obj.name}
                  id={obj._id}
                  type={type}
                  handleClose={togglePopup}
                  open={isOpen}
                />}
              </ListItem >
              </React.Fragment>
            ))}
          </List>
          </React.Fragment>
      );
    } else{
        if(type === constants.LIST_TYPES.CONTACTS) {
          return( 
            <React.Fragment>  
              <List>     
                  {/* {list.map((obj, index) => ( */}
                      {/* <React.Fragment> */}
                          <ListItem button divider="true" classes={classes.listbutton1} key={"dsfasdq3213"} >
                              <ListItemText primary={"Add contacts to show"} />
                          </ListItem>
                      
                      {/* </React.Fragment> */}
                  {/* ))} */}
              </List>
            </React.Fragment>
          )
        }  else if(type === constants.LIST_TYPES.CHATS){
          return( 
            <React.Fragment>  
              <List>  
                <ListItem button divider="true" classes={classes.listbutton1} key={"1"} >
                      <ListItemText primary={"Chat with your friends!"} />
                  </ListItem>
              </List>
            </React.Fragment>
          )
        } //else if(type === constants.LIST_TYPES.USERS) {
        //     return( 
        //         <React.Fragment>  <span></span>
        //         </React.Fragment>
        //       )
        // }
      
    }
  }

export default ListRendering;