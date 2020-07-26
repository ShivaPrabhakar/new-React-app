import React from 'react';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import axios from 'axios';
import {connect} from 'react-redux';
import {setContacts,setChats,getToggleVal} from '../actions/Toggle';
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

  let showContacts;
  let showChats;
function ListUI(props){
  const classes = useStyles;


  const getContacts =  async()=>{
    let res = await axios.get('/get/friends',config)
    console.log(res.data.contacts);
    return  res.data.contacts;
  };
  const getChats =  ()=>{  return ['shiva','prabhakar'] };
  console.log(getContacts());
  console.log(getChats());
  

    console.log("ssssss === ",props.s);
    const setList = () =>{
      let l ;
      if(props.s.showContacts === true)
        l =   getContacts();
      else
        l =  getChats();
      return  (l);
    }
  let list = setList();
  console.log(typeof(list));
  console.log("list  == ",list.length);
  if(list.length>0){
    return (
          <List>
          
          {list.map((text, index) => (
              <React.Fragment>
            <ListItem button divider="true" classes={classes.listbutton1} key={text} >
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
            </React.Fragment>
          ))}
        </List>
        );
  }
  else{
    return(   
       <div>
         <Typography align='center' variant='body1' variantMapping='h3'>
            Nothing
         </Typography>
      </div>
    )
  }
  
};




const mapStateToProps = (state) =>{
 
  console.log(state);
  const s =  {
    showChats : state.tabs.toggleVal.showChats,
    showContacts : state.tabs.toggleVal.showContacts
 };
 console.log(s);
  return { s };
 //  showChats = state.toggleVal.showChats;
}

export default connect(mapStateToProps,{setContacts,setChats,getToggleVal})(ListUI);
