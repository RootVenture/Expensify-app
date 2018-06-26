import { firebase, googleAuthProvider, GitHubAuthprovider } from '../firebase/firebase';

export const login = uid => ({
  type: 'LOGIN',
  uid,
});

export const startGoogleLogin = () => () => firebase.auth().signInWithPopup(googleAuthProvider);

export const startGithubLogin = () => () => firebase.auth().signInWithPopup(GitHubAuthprovider);

export const logout = () => ({
  type: 'LOGOUT',
});

export const startLogout = () => () => firebase.auth().signOut();
