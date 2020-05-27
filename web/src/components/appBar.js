import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: theme.spacing(0)
  },
  title: {
    flexGrow: 1,
  },
  margin:{
      margin: theme.spacing(0)
  },
  chatbtn:{
      size: '7ch'
  }
}));

export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    <div className={clsx([classes.root,classes.margin])}>
      <AppBar className={classes.margin} position="fixed">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
          <Button size={"large"} disableRipple disableFocusRipple disableElevation href={'/home'} color="inherit"><strong className={classes.chatbtn} >ChatApp</strong></Button>
          </Typography>
          <Button disableRipple disableFocusRipple disableElevation href={'/home'} color="inherit">Home</Button>
          <Button disableRipple disableFocusRipple disableElevation href={'/register'} color="inherit">Register</Button>
          <Button disableRipple disableFocusRipple disableElevation href={'/login'} color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
