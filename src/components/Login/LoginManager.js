import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import "firebase/firestore";


export const initializeLoginFramework = () => {
  if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
  }
}
export const handleAppleSignIn = () => {
  var provider = new firebase.auth.OAuthProvider('apple.com');
  return firebase
  .auth()
  .signInWithPopup(provider)
  .then((result) => {
    console.log(result)
   
    // ...
  })
  .catch((error) => {
    console.log(error)
    
    // ...
  });
}

export const handleGoogleSignIn = () => {
  const googleProvider = new firebase.auth.GoogleAuthProvider();
  return firebase.auth().signInWithPopup(googleProvider)
    .then(res => {
      const { displayName, photoURL, email } = res.user;
      const signedInUser = {
        isSignedIn: true,
        name: displayName,
        email: email,
        photo: photoURL,
        success: true
      };
      setUserToken();
      return signedInUser;
    })
    .catch(err => {
      console.log(err);
      console.log(err.message);
    })
}

const setUserToken = () => {
  firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function (idToken) {
    sessionStorage.setItem('token', idToken);
  }).catch(function (error) {
    // Handle error
  });
}
export const handleFbSignIn = () => {
  const fbProvider = new firebase.auth.FacebookAuthProvider();
  return firebase.auth().signInWithPopup(fbProvider).then(function(result) {
    var token = result.credential.accessToken; 
    sessionStorage.setItem('token', token)   
    var user = result.user;
    user.success = true;


    const { displayName, photoURL, email } = result.user;
      const signedInUser = {
        isSignedIn: true,
        name: displayName,
        email: email,
        photo: photoURL,
        success: true
      };

    return signedInUser;
  }).catch(function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode, errorMessage)
  });
}

export const handleSignOut = () => {
  return firebase.auth().signOut()
    .then(res => {
      const signedOutUser = {
        isSignedIn: false,
        name: '',
        email: '',
        photo: '',
        error: '',
        success: false
      }
      return signedOutUser;
    }).catch(err => {
      // An error happened.
    });
}