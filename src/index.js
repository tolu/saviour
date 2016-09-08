import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Main from './main';


// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();


const App = () => (
  <Main />
);

const containerElement = document.querySelector('#root');
ReactDOM.render(<App />, containerElement);
