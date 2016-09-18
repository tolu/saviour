import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import initChart from './chart';
import {planFromData} from './saviour';
import data from  './data.json';

const plan = planFromData(data);

const paperStyle = {
  padding: '25px',
  margin: '5px 0 5px'
};

class Main extends Component {
  componentDidMount(){
    this.loadCharts();
  }
  loadCharts(){
    initChart('#chart1', plan, 'donut');
    initChart('#chart2', plan, 'bar');
    initChart('#chart3', plan, 'pie');
  }
  render(){
    return (
      <MuiThemeProvider>
        <div className="demo-App">
          {/*<AppBar
            title="Saviour"
            iconClassNameRight="muidocs-icon-navigation-expand-more"
          />*/}
          <Paper style={paperStyle} zDepth={2}>
            <h1>{plan.title}</h1>

            <p>{plan.description}</p>
            <RaisedButton
              label="Re-Load Fancy Charts"
              secondary={true}
              onTouchTap={this.loadCharts}
            />
          </Paper>
          <Paper style={paperStyle} zDepth={2}>
            <canvas id="chart1" />
          </Paper>
          <Paper style={paperStyle} zDepth={2}>
            <canvas id="chart2" />
          </Paper>
          <Paper style={paperStyle} zDepth={2}>
            <canvas id="chart3" />
          </Paper>

        </div>
      </MuiThemeProvider>
    )
  }
}

export default Main;
