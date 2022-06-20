import React, { useState, useEffect } from 'react';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import axios from 'axios';
// import {connect} from 'react-redux';
// import {setContacts,setChats,getToggleVal} from '../actions/Toggle';
const config = {
    headers:{
      "Content-Type":"application/json"
    }
  }

  const useStyles = makeStyles((theme) => ({
    listbutton1: {
        height:50,
    },
    nothing:{
      marginTop:20
    }
  }));

const  ListUI =   React.memo(function ListUI(props)  {
  const classes = useStyles;
  const [contacts,setContacts] = useState([]);
  const [chats,setChats] = useState([]);
 
  let showContacts = props.showContacts;
  let showChats = props.showChats;
  console.log(showContacts, showChats);
  // useEffect(() => {
  //   function handleContacts(contacts) {
  //     setContacts(contacts)
  //   }
  //   function handleChats(contacts) {
  //     setContacts(contacts)
  //   }
  // })

  const getChats =  async ()=>{  return setChats([{name : 'shiva'},{ name:'prabhakar'}]);};

  const getContacts =  async()=>{
    if(showContacts) {
        let res = await axios.get('/get/friends',config)
        console.log("res data = ",Array.isArray(res.data.contacts));
          setContacts(res.data.contacts);
          console.log("assigning to var");
    }
  }

  // useEffect(() => {
  //     getContacts();
  //     getChats();

  //     // return;
  //   },[showContacts,showChats]);

    console.log("ssssss === ",props);
    const setList = () =>{
      if(props.showContacts === true){
          getContacts();
          console.log("got var"); 
          console.log("res cont ",contacts); 
          listRendering(contacts);
      }
      else {
        getChats();
        listRendering(chats);
      }
    }


    function listRendering (list) {
      if(list.length>0){
        return (
          <React.Fragment>
              <List>      
              {list.map((obj, index) => (
                  <React.Fragment>
                <ListItem button divider="true" classes={classes.listbutton1} key={obj.name} >
                  <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                  <ListItemText primary={obj.name} />
                </ListItem>
                </React.Fragment>
              ))}
            </List>
            </React.Fragment>
            );
      }
      else{
        return( 
          <React.Fragment>  
            <List>     
                {list.map((obj, index) => (
                    <React.Fragment>
                        <ListItem button divider="true" classes={classes.listbutton1} key={obj.name} >
                            <ListItemText primary={obj.name} />
                        </ListItem>
                    </React.Fragment>
                ))}
            </List>
            </React.Fragment>
        );
      }
    }

  setList();
  

  
  
});




// const mapStateToProps = (state) =>{
 
//   console.log(state);
//   const s =  {
//     showChats : state.tabs.toggleVal.showChats,
//     showContacts : state.tabs.toggleVal.showContacts
//  };
//  console.log(s);
//   return { s };
//  //  showChats = state.toggleVal.showChats;
// }

// export default connect(mapStateToProps,{setContacts,setChats,getToggleVal})(ListUI);
export default ListUI;

