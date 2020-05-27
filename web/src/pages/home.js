import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
//import Modal from '@material-ui/core/Modal';
import f from '../images/image.png'
import clsx from 'clsx';
//import { urlencoded } from 'body-parser';

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: '158ch',
      },
  title: {
    flexGrow: 1,
  },
  paper:{
      marginTop : theme.spacing(10),
      height: '48ch',
      position: 'relative',
      color:'#fff'
  },
  paper2:{
      marginTop : theme.spacing(2),
      height:'48ch',
  },
  margin:{
      margin: theme.spacing(0)
  },
  
 media1:{
    paddingTop: '56.25%' // 16:9
 },
 overlay: {
    position: 'absolute',
    top: '20px',
    left: '20px',
    color: 'black',
    margin: theme.spacing(20),
    marginLeft:theme.spacing(50)
 },backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  paperText:{
    color:'black',
    opacity:'1',
    zIndex: theme.zIndex.drawer + 1,
}
}));

export default function Home() {
  const classes = useStyles();
  const styles = {
      paperStyle:{
          height:'48ch',
        opacity:'0.3',
        width:'156ch',
      },
      paperText:{
          opacity:'1',
      }
  }
  return (
    <div className={clsx([classes.root,classes.margin])}>
    <Paper elevation={3} className={classes.paper} >
       <img src={f} alt="bgimg" style={styles.paperStyle} />
            <h3 className={classes.overlay} style={styles.paperText}>"The best Chat application with a lot of features."</h3>
    </Paper>
    <Paper elevation={3} className={classes.paper2}>
        <h3>features</h3>
    </Paper>
    </div>
  );
}
