import React from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import QuestionAnswerRoundedIcon from '@material-ui/icons/QuestionAnswerRounded';
import RecentActorsRoundedIcon from '@material-ui/icons/RecentActorsRounded';
import ListUI from './List';
// import axios from 'axios'; 
import {connect} from 'react-redux';
import {setContacts,setChats} from '../actions/Toggle';

// const config = {
//   headers:{
//     "Content-Type":"application/json"
//   }
// }

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    maxWidth: 500,
  },
});

 function IconLabelTabs(props) {
  const classes = useStyles();
  // const [value, setValue] = React.useState(0);

  // const [contacts,setContacts] = React.useState({
  //   contacts:true,
  //   chats:false
  // });

  // const [chats,setChats] = React.useState({
  //   contacts:false,
  //   chats:true
  // });

  // const onSetContacts = async (event)=> {
  //   event.preventDefault();
  //   setContacts(true);
  //   setChats(false);
  //   console.log(chats, contacts);
  // };

  // const onSetChats = async (event)=> {
  //   event.preventDefault();
  //   setChats(true);
  //   setContacts(false);
  //   console.log(chats, contacts);
  //   <ListUI showContacts={contacts} />;
  // };

  // const handleChange = (event, newValue) => {
  //   setValue(newValue);
  // };

  return (
    <Paper square className={classes.root}>
      <Tabs
        // value={value}
        // onChange={handleChange}
        variant="fullWidth"
        indicatorColor="secondary"
        textColor="secondary"
        aria-label="icon label tabs example"
      >
        <Tab icon={<QuestionAnswerRoundedIcon />} label="CHATS" onClick={props.onSetChats}/>
        <Tab icon={<RecentActorsRoundedIcon />} label="CONTACTS" onClick={props.onSetContacts}/>
      </Tabs>
    </Paper>
  );
}


// export default connect(null,{setContacts,setChats})(IconLabelTabs);
export default IconLabelTabs;
