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
  var list;
  let showContacts = props.showContacts;
  let showChats = props.showChats;
  console.log(showContacts, showChats);
  useEffect(() => {
   
      if(props.showContacts) {
         getContacts();
      }
    
  }, []);
  useEffect(() => {
  
      if(props.showChats) {
         getChats();
      }
    
  }, []);

  useEffect(() => {
    
      if(props.showContacts) {
         getContacts();
      }
    
  }, [props.showContacts]);
  useEffect(() => {
    
      if(props.showChats) {
         getChats();
      }
    
  }, [props.showChats]);

  const getChats =  async ()=>{
    if(props.showChats){
      setChats([{name : 'shiva'},{ name:'prabhakar'}]);
      // return listRendering(chats)
    }
    //  callback(null, chats)
};

  const getContacts =  async()=>{
    if(props.showContacts) {
        let res = await axios.get('/get/friends',config)
        console.log("res data = ",Array.isArray(res.data.contacts));
          setContacts(res.data.contacts);
          // return listRendering(contacts)
          // console.log("assigning to var",callback);
          // callback(null, res.data.contacts)
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
      //     getContacts();
      //     console.log("got var"); 
      //     return (
           
              return listRendering({list: contacts, isContacts: true})
           
      //     );
      }
      else {
      //   getChats();
      //   console.log("getChats");
      //   return (
         
           return listRendering({list: chats, isContacts: false})
      //   )
      }
    }


    function listRendering (args) {
      let {list, isContacts} = args;
      console.log("list",list);
      if(list.length>0){
        console.log("in creating list");
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
      } else{
          if(isContacts) {
            return( 
              <React.Fragment>  
                <List>     
                    {/* {list.map((obj, index) => ( */}
                        {/* <React.Fragment> */}
                            <ListItem button divider="true" classes={classes.listbutton1} key={"1"} >
                                <ListItemText primary={"Add contacts to show"} />
                            </ListItem>
                        
                        {/* </React.Fragment> */}
                    {/* ))} */}
                </List>
              </React.Fragment>
            )
          }  else {
            return( 
              <React.Fragment>  
                <List>  
                  <ListItem button divider="true" classes={classes.listbutton1} key={"1"} >
                        <ListItemText primary={"Chat with your friends!"} />
                    </ListItem>
                </List>
              </React.Fragment>
            )
          }
        
      }
    }

  return setList();
  

  
  
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

