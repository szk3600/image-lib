import React , { useState, useEffect } from 'react';

import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import firebase from '../firebase';
import { makeStyles } from '@material-ui/core/styles';
import { useConfirm } from "material-ui-confirm";

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

const FirebaseImage = (props) => {
  const {imageRef,index,imageSelected,editable} = props,
				confirm = useConfirm(),
				classes = useStyles(),
				[url, setUrl] = useState(""),
				handleDelete = (url) => {
					confirm({ description: '本当に削除してよろしいですか？',
										confirmationText: '削除',cancellationText:'キャンセル'
									})
						.then(() => {
							const ref = firebase.app().storage().refFromURL (url);
							ref.delete().then(function() {
								console.log ('Deleted.');
							}).catch(function(error) {
								// Uh-oh, an error occurred!
							});
						}).catch(() => console.log("Deletion cancelled."));
				};

  useEffect(() => {
    async function getUrl() {
      try {
	  setUrl( await imageRef.getDownloadURL());
      } catch (err) {
        console.error(err);
      }
    }
      getUrl();
  });
	if (url) {
		if (editable) {
			return (<div className={classes.editableBlock}>
								<img className={classes.image} src={url} alt="cat {index} "  onClick={imageSelected}/>
								<DeleteOutlineIcon className={classes.deleteIcon} onClick={()=>handleDelete(url)} data={url}/>
			</div>);
		} else {
		return (<img className={classes.image} src={url} alt="cat {index} "  onClick={imageSelected}/>);
		} 
	} return (<div>Image loding...</div>);
}


const ImageList = ({basePath,imageSelected,maxResults,editable}) => {
    const [imageList, setImageList] = useState([]);
    const [imagePage, setImagePage] = useState(null);
    const storage = firebase.app().storage(),
					storageRef = storage.ref(),
					listRef = storageRef.child(basePath);

  useEffect(() => {
    async function fetchImages() {
      try {
	  if (imagePage && imagePage.nextPageToken) {
	      var page = await listRef.list({
		  maxResults: maxResults,
		  pageToken: imagePage.nextPageToken,
	      });
	      setImageList (imageList.concat (page.items) );
	      if (page.nextPageToken) setImagePage (page);
	  } else {
	      var firstPage = await listRef.list({ maxResults: maxResults});
	      setImageList (firstPage.items );
	      setImagePage (firstPage);
	  }
      } catch (err) {
        console.error(err);
      }
    }
      fetchImages();
  },[imagePage]);

    return( <div> { imageList.map((ref,index) => (
			<FirebaseImage key={index} imageRef={ref} editable={editable}
															 index={index} imageSelected={imageSelected} />))  }
	    </div>);
};

export default ImageList;
