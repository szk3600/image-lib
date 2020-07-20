import React,{useEffect,useState} from 'react';

import AddImage from '../components/AddImage';
import ImageList from '../components/ImageList';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
}));



export default function Album ({user,editable}) {
    const classes = useStyles();
	if (user) {
		const basePath = 'user/data/' + user.uid + '/images/'
		return (<div>
        <Toolbar>
					<Typography variant="h4" className={classes.title}>Image List</Typography>
					{ editable?<AddImage basePath={basePath} />: null }
        </Toolbar>
							<ImageList basePath={basePath} maxResults={100} editable={editable}/>
	</div>);
	} else {
		return null;
	}
}
