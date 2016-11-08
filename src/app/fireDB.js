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
const users = 'users/';
const labels = 'labels/';
const proj = 'projects/';
const trans = 'transactions/';

global.db = db;
window.db = db;

export const addTransaction = ({who, what, value}) => {
  trans.push().set({
    amount: value,
    lable: what,
    user: who
  });
}

export const removeTransaction = (id) => {
  const path = `transactions/${id}`;
  exist(path).then( val => {
    console.log('remove transaction', val);
    // trans.ref(id).remove();
  });
}

export const getData = () => {
  const promises = [getOnce(proj), getOnce(users), getOnce(trans), getOnce(labels)];
  return new Promise((resolve) => {
    Promise.all(promises).then( resArray => {
      resolve(resArray);
    })
  });
}

function exist(path){
  return new Promise((resolve, reject) => {
    getOnce(path).then( val => {
      if(!!val){
        resolve(val);
      } else {
        reject();
      }
    });
  });
}

function getOnce(path){
  return new Promise((resolve) => {
    db.ref(path)
      .once('value')
      .then( snap => resolve(snap.val()) );
  });
}
