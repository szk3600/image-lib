import React from 'react';
import firebase from '../firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

const uiConfig = {
    callbacks: {
				signInSuccessWithAuthResult: function(authResult, redirectUrl) {
		    // User successfully signed in.
		    // Return type determines whether we continue the redirect automatically
		    // or whether we leave that to developer to handle.
						console.log ('signInSuccessWithAuthResult');
	    return true;
	},
	signInFailure: function(error) {
	    return true;
//            return handleUIError(error);
        },
	uiShown: function() {
	    //      document.getElementById('loader').style.display = 'none';
	}
    },
    // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
    signInFlow: 'popup',
    signInSuccessUrl: '/album',
    signInOptions: [ {
			provider:  firebase.auth.EmailAuthProvider.PROVIDER_ID,
			signInMethod: firebase.auth.EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD
    },
										 
									 ],
    // Terms of service url.
    tosUrl: '/tos',
    // Privacy policy url.
    privacyPolicyUrl: '/privacy'
};

const Login = ({user,setUser}) => {
  return (<StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>);
};

export default Login;

