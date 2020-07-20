import React,{useState} from "react";
import { ConfirmProvider } from "material-ui-confirm";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import MenuAppBar from './components/MenuAppBar';
import Member from './pages/Member';
import Login from './pages/Login';
import Album from './pages/Album';
import Image from './pages/Image';

export default function App() {
  const [user,setUser] = useState (null);
	return (
    <ConfirmProvider>
		<Router>
			<div>
				<MenuAppBar user={user} setUser={setUser} />
				<Switch>
					<Route path="/login">
						<Login user={user} setUser={setUser} />
					</Route>
					<Route path="/about">
						<About />
					</Route>
					<Route path="/member">
						<Member user={user}/>
					</Route>
					<Route path="/album">
						<Album user={user} editable={true}/>
					</Route>
					<Route path="/image">
<Image user={user}/>
					</Route>
					<Route path="/">
						<Home />
          </Route>
        </Switch>
      </div>
    </Router>
    </ConfirmProvider>
  );
}

function Home(props) {
  return (<div><h2>Home</h2></div>);
}

function About() {
  return <h2>About</h2>;
}



