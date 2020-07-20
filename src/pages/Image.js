import React,{useEffect,useState} from 'react';

import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import SelectImage from '../components/SelectImage';


const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
	selectedImage: {
		width: "100%",
		height: "100%"
	}
}));

export default function Image ({user}) {
  const classes = useStyles(),
				[url,setUrl] = useState ("");
	
	if (user) {
		const basePath = 'user/data/' + user.uid + '/images/'
		return (<div>
        <Toolbar>
					<Typography variant="h4" className={classes.title}>Select Image</Typography>
					<SelectImage basePath={basePath} setUrl={setUrl} maxResults={100}/>
        </Toolbar>
							{ url?<img src={url} />:<div><p>イメージを選択してください。</p></div> }
	</div>);
	} else {
		return null;
	}
}
