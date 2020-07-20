import React from "react";
//import { useHistory } from "react-router-dom";
import firebase from '../firebase';

export default function Member({user}) {
    return <div><h2>メンバー</h2>
	<p>Name:{user?user.displayName:"None"} </p>
	<p>uid:{user?user.uid:"None"} </p>
	</div>;
}
