import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
// import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
// import ListItemText from '@material-ui/core/ListItemText';
// import InboxIcon from '@material-ui/icons/MoveToInbox';
// import MailIcon from '@material-ui/icons/Mail';
import ButtonAppBar from './../components/appBar';
import IconLabelTabs from '../components/TabBar';
// import axios from 'axios';
// import {connect} from 'react-redux';
import ListUI from '../components/List';
import {setContacts,setChats,getToggleVal} from '../actions/Toggle';
const config = {
    headers:{
      "Content-Type":"application/json"
    }
  }

const drawerWidth = 340;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  listbutton1: {
      height:50,
  },
}));


var showContacts;
var showChats;


const  LeftPane =  React.memo(function LeftPane(props) {
  const classes = useStyles();
  
  

  const [value, setValue] = React.useState(0);

  const [contacts,setContacts] = React.useState({
    contacts:false,
    chats:true
  });

  const [chats,setChats] = React.useState({
    contacts:true,
    chats:false
  });

  const onSetContacts = async (event)=> {
    event.preventDefault();
    setContacts(true);
    setChats(false);
    console.log(chats, contacts);
  };

  const onSetChats = async (event)=> {
    event.preventDefault();
    setChats(true);
    setContacts(false);
    console.log(chats, contacts);
  };

 
  console.log("props = ",props);

  return (

    <div className={classes.root}>

      <CssBaseline />
    <ButtonAppBar position="fixed" className={classes.appBar}/> 

      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
        <IconLabelTabs onSetContacts={onSetContacts} onSetChats={onSetChats}/>
            <React.Fragment>
                <ListUI showContacts={contacts} showChats={chats} />

            </React.Fragment>
        </div>
      </Drawer>
      <main className={classes.content}>
        <Toolbar />
        <Typography paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Rhoncus dolor purus non enim praesent elementum
          facilisis leo vel. Risus at ultrices mi tempus imperdiet. Semper risus in hendrerit
          gravida rutrum quisque non tellus. Convallis convallis tellus id interdum velit laoreet id
          donec ultrices. Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
          adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra nibh cras.
          Metus vulputate eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo quis
          imperdiet massa tincidunt. Cras tincidunt lobortis feugiat vivamus at augue. At augue eget
          arcu dictum varius duis at consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem
          donec massa sapien faucibus et molestie ac.
        </Typography>
        <Typography paragraph>
          Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper eget nulla
          facilisi etiam dignissim diam. Pulvinar elementum integer enim neque volutpat ac
          tincidunt. Ornare suspendisse sed nisi lacus sed viverra tellus. Purus sit amet volutpat
          consequat mauris. Elementum eu facilisis sed odio morbi. Euismod lacinia at quis risus sed
          vulputate odio. Morbi tincidunt ornare massa eget egestas purus viverra accumsan in. In
          hendrerit gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem et
          tortor. Habitant morbi tristique senectus et. Adipiscing elit duis tristique sollicitudin
          nibh sit. Ornare aenean euismod elementum nisi quis eleifend. Commodo viverra maecenas
          accumsan lacus vel facilisis. Nulla posuere sollicitudin aliquam ultrices sagittis orci a.
        </Typography>
      </main>
    </div>
  );
})

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

export default LeftPane;