import React,{useRef} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import { v4 as uuidv4 } from 'uuid';
import firebase from '../firebase';

import Fab from '@material-ui/core/Fab';

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'inline-block',
		margin: '8px'
	},
	inputFileBtnHide: {
		opacity:0,
		appearance: 'none',
		position: 'absolute'
	}
}));


export default function AddImage({basePath,uploadedImage}) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
	const inputFileRef = useRef();
  const handleClickOpen = () => {
    setOpen(true);
		inputFileRef.current.click();
  };

	const handleChange = () => {
		let files = inputFileRef.current.files,
				storageRef = firebase.storage().ref();
		if (files) {
			for (let index = 0; index < files.length; index++ ) {
				let fileid = uuidv4(),
						path = basePath + fileid,
						fileRef = storageRef.child (path);
				fileRef.put(files[index]).then(function(snapshot) {
					fileRef.getDownloadURL().then ( function (url) {
						uploadedImage ( url);
						console.log('Uploaded a blob or file!');
					});

				});
			}
		}
	}


  return (
    <div className={classes.root}>
			<input ref={inputFileRef} type="file" className={classes.inputFileBtnHide}
						 onChange={handleChange}　multiple="multiple" accept="image/*"/>
			<Fab color="secondary" aria-label="add image" onClick={handleClickOpen} >
							<AddIcon />
						</Fab>
    </div>
  );
}
