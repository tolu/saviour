import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';

const paperStyle = {
  padding: '25px'
};

const Main = () => (
  <MuiThemeProvider>
    <div className="demo-App">
      <AppBar
        title="Saviour"
        iconClassNameRight="muidocs-icon-navigation-expand-more"
      />
      <Paper style={paperStyle} zDepth={2}>
        <h1>SAVIOUR</h1>

        <h2>example project</h2>
        <RaisedButton
          label="Super Secret Password"
          secondary={true}
          // onTouchTap={ this.handleTouchTap }
        />
      </Paper>
    </div>
  </MuiThemeProvider>
);

export default Main;