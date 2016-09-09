import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import initChart from './chart';
import saviour from './saviour';

const plan = saviour.getPlan('spareplan');

const paperStyle = {
  padding: '25px',
  margin: '5px 0 5px'
};

const Main = () => (
  <MuiThemeProvider>
    <div className="demo-App">
      <AppBar
        title="Saviour"
        iconClassNameRight="muidocs-icon-navigation-expand-more"
      />
      <Paper style={paperStyle} zDepth={2}>
        <h1>{plan.title}</h1>

        <p>{plan.description}</p>
        <RaisedButton
          label="Load Fancy Chart"
          secondary={true}
          onTouchTap={loadCharts}
        />
      </Paper>
      <Paper style={paperStyle} zDepth={2}>
        <canvas id="chart1" />
      </Paper>
      <Paper style={paperStyle} zDepth={2}>
        <canvas id="chart2" />
      </Paper>

    </div>
  </MuiThemeProvider>
);

function loadCharts(){
  initChart('#chart1', plan, 'donut');
  initChart('#chart2', plan, 'bar');
}

export default Main;
