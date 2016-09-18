import firebase from 'firebase';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyBFc_cmGu2Kb4Dmasbw_LOqwO3pS7CYRBQ",
  authDomain: "saviour-5abc2.firebaseapp.com",
  databaseURL: "https://saviour-5abc2.firebaseio.com",
  storageBucket: "saviour-5abc2.appspot.com",
  messagingSenderId: "710302979043"
};
firebase.initializeApp(config);

const db = firebase.database();
const users = db.ref('users/');
const proj = db.ref('projects/');
const trans = db.ref('transactions/');

global.db = db;
window.db = db;

export const getData = () => {
  const promises = [getOnce(proj), getOnce(users), getOnce(trans)];
  return new Promise((resolve) => {
    Promise.all(promises).then( resArray => {
      resolve(resArray);
    })
  });
}

function getOnce(ref){
  return new Promise((resolve) => {
    ref.once('value').then(getValue(resolve));
  });
}

function getValue(resolve){
  return (snapshot) => {
    resolve(snapshot.val());
  }
}
