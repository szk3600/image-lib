import React,{useEffect,useState} from 'react';

import AccountCircle from '@material-ui/icons/AccountCircle';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

import {
  Link
} from "react-router-dom";

import firebase from '../firebase';

const useStyles = makeStyles((theme) => ({
  userAvatar: {
    borderRadius: "50%",
    width: 48,
    height: 48,
  },
  menuItemLink: {
		color: "black",
		textDecoration: "none",
  },
  loginButton: {
		color: 'white',
		textDecoration: "none",
  }
}));

export default function UserMenu ({user,setUser}) {
  const classes = useStyles();
  useEffect(() => {
		let unregisterAuthObserver = firebase.auth().onAuthStateChanged(
      (user) => setUser(user)
    );

    return () => {
			unregisterAuthObserver();
    }
  }, [])
	
  
  return (user ? <MemberMenu user={user} setUser={setUser} /> : <Link className={classes.loginButton}
																																			to="/login">Login</Link>);
}

const MemberMenu = ({user,setUser}) => {
  const classes = useStyles(),
				[anchorEl, setAnchorEl] = React.useState(null),
				open = Boolean(anchorEl),
				handleMenu = (event) => { setAnchorEl(event.currentTarget); },
				handleClose = () => { setAnchorEl(null); };

  return (<div>
            <Menu
              id="user-menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={open}
              onClose={handleClose}
            >
							<MenuItem ><Link className={classes.menuItemLink} to="/album">アルバム</Link></MenuItem>
							<MenuItem ><Link className={classes.menuItemLink} to="/image">イメージ</Link></MenuItem>

							<MenuItem ><Link className={classes.menuItemLink} to="/member">メンバ</Link></MenuItem>
							<MenuItem onClick={() => {logout(setUser); handleClose();}}>Logout</MenuItem>
            </Menu>

            <IconButton
              aria-label="account of current user"
              aria-controls="user-menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
							{user.photoURL? <img className={classes.userAvatar} src={user.photoURL} alt="user avatar" height="48" width="48" /> :  <AccountCircle /> }
            </IconButton>
          </div>
				 );
}

const logout =  (setUser) => {
	firebase.auth().signOut().then(()=>{
    console.log("ログアウトしました");
    setUser(null);
  })
		.catch( (error)=>{
			console.log(`ログアウト時にエラーが発生しました (${error})`);
		});
}

