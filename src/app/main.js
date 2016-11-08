import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import initChart from './chart';
import {planFromData} from './saviour';
import data from  './data.json';
import {getData, addTransaction, removeTransaction} from './fireDB';
import Avatar from 'material-ui/Avatar';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow
} from 'material-ui/Table';
import {Tabs, Tab} from 'material-ui/Tabs';

import DataInput from './components/DataInput';
import TransactionRow from './components/TransactionRow';

let hasData = false;
let users = [];
let labels = [];
let transactions = [];
getData().then((res) => {
  console.info('data', res);
  hasData = true;
  users = res[1];
  labels = res[3];
  transactions = Object.keys(res[2]).map( key => {
    const t = res[2][key];
    return {
      key,
      user: users[t.user].avatar,
      amount: t.amount,
      lable: labels[t.lable]
    }
  });
})

const plan = planFromData(data);

const paperStyle = {
  padding: '25px',
  margin: '5px 0 5px'
};

const renderDataTable = () => (
    <Table>
      <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
        <TableRow>
          <TableHeaderColumn>Who</TableHeaderColumn>
          <TableHeaderColumn>What</TableHeaderColumn>
          <TableHeaderColumn>Amount</TableHeaderColumn>
        </TableRow>
      </TableHeader>
      <TableBody displayRowCheckbox={false}>
      { transactions.map(t => {
        return (
          <TransactionRow
            key={t.key}
            transaction={t}
            removeTransaction={removeTransaction} />
        );
      })}
      </TableBody>
    </Table>
);

class Main extends Component {
  constructor(props) {
    super(props);
    if(hasData) return;
    let handler = setInterval(() => {
      if(hasData) {
        clearInterval(handler);
        this.assignUserData();
      }
    }, 250);
  }
  assignUserData() {
    console.log('assigning user data to', users);
    this.setState({ users });
  }
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
            <div>
              {hasData && this.state.users.map((user) => {
                return <Avatar key={user.name} src={user.avatar} />;
              })}
            </div>
            <RaisedButton
              label="Re-Load Fancy Charts"
              secondary={true}
              onTouchTap={this.loadCharts}
            />
          </Paper>
          <Paper style={paperStyle} zDepth={2}>
            <Tabs>
              <Tab label="Doghnut Chart"><canvas id="chart1" /></Tab>
              <Tab label="Bar Charts"><canvas id="chart2" /></Tab>
              <Tab label="Pie Chart"><canvas id="chart3" /></Tab>
              <Tab label="Data">
                <DataInput addTransaction={addTransaction} />
                { hasData && renderDataTable() }
              </Tab>
            </Tabs>
          </Paper>
        </div>
      </MuiThemeProvider>
    )
  }
}

export default Main;
