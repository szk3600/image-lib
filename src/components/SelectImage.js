import React , { useState, useEffect } from 'react';

import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import firebase from '../firebase';
import PhotoIcon from '@material-ui/icons/Photo';
import { makeStyles } from '@material-ui/core/styles';
import { useConfirm } from "material-ui-confirm";
import Modal from '@material-ui/core/Modal';
import AddImage from './AddImage';
import ImageList from './ImageList';


const useStyles = makeStyles((theme) => ({
	editableBlock: {
		display: 'inline-block',
		position: "relative"
	},
	deleteIcon: {
		position: 'absolute',
		top: '8px',
		right: '8px',
		color: 'white',
		'&:hover': {
		backgroundColor: 'white',
		color: 'black'
		}

	},

  image: {
		height: "100px",
		margin: "4px"
  },
}));

const SelectImage = ({basePath,setUrl, maxResults}) => {
    const storage = firebase.app().storage(),
					storageRef = storage.ref(),
					listRef = storageRef.child(basePath),
					imageSelected = (e) => {
						if ( e.target.src) {
							setUrl(e.target.src);
							handleClose();
						}
					},
					uploadedImage = (url) =>{
							setUrl(url);
							handleClose();
					},
					[open, setOpen] = React.useState(false),
					handleOpen = () => {
						setOpen(true);
					},
					handleClose = () => {
						setOpen(false);
					};

	return <div><PhotoIcon onClick={handleOpen}/>
    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
			<div>
			<AddImage basePath={basePath} uploadedImage={uploadedImage} />

			<ImageList basePath={basePath} maxResults={100} imageSelected={imageSelected} />
				</div>
      </Modal>
				 </div>
};

export default SelectImage;
