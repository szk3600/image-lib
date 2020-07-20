import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Link } from "react-router-dom";


import UserMenu from './UserMenu';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
    menuItemLink: {
	color: "black",
	textDecoration: "none",
    }
}));

export default function MenuAppBar({user,setUser}) {
    const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
	  <AppMenu/>
	  <AppTitle  />
	  <UserMenu user={user} setUser={setUser} />
        </Toolbar>
      </AppBar>
    </div>
  );
}

const AppMenu = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const classes = useStyles();
    const handleMenu = (event) => { setAnchorEl(event.currentTarget); };
    const handleClose = () => { setAnchorEl(null); };

    return ( <div>
<IconButton edge="start" className={classes.menuButton}
                aria-label="app main menu"
                aria-controls="app-menu-appbar"

	color="inherit" aria-haspopup="true" onClick={handleMenu}>
            <MenuIcon />
        </IconButton>
              <Menu
                id="app-menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMountedf
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
             <MenuItem ><Link className={classes.menuItemLink} to="/">Home</Link></MenuItem>
            <MenuItem>About</MenuItem>
            <MenuItem>Privacy</MenuItem>
             </Menu>

</div>

);};

const AppTitle = () => {
        const classes = useStyles();
    return(<Typography variant="h6" className={classes.title}>World Page</Typography>);
};

