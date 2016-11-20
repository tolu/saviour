import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import initChart from './chart';
import {planFromData} from './saviour';
import data from  './data.json';
import {getData, addTransaction, removeTransaction, onChange} from './fireDB';
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
function loadData(){
  return getData().then((res) => {
    console.info('data', res);
    hasData = true;
    users = res[1];
    labels = res[3];
    transactions = Object.keys(res[2]).map( key => {
      const t = res[2][key];
      return {
        key,
        user: users[t.user].avatar,
        userId: t.user,
        amount: t.amount,
        lable: labels[t.lable],
        lableId: t.lable
      }
    });
  });
}
loadData();
const planMeta = {
  goal: 750000,
  title: "Spareplan",
  subtitle: "Egenkapital till lgh-köp"
};

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
        this.listenForDataChanged()
      }
    }, 250);
  }
  listenForDataChanged() {
    onChange(() => {
      loadData().then(() => {
        this.assignUserData();
      });
    });
  }
  assignUserData() {
    console.log('assigning user data to', users);
    this.setState({ users });
    this.loadCharts();
  }
  loadCharts(){
    const data = Object.assign(planMeta, {
      transactions,
      people: users.map(u => u.name),
      labels
    });
    const myPlan = planFromData(data);
    initChart('#chart1', myPlan, 'donut');
    initChart('#chart2', myPlan, 'bar');
    initChart('#chart3', myPlan, 'pie');
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
            <h1>{planMeta.title}</h1>
            <p>{planMeta.description}</p>
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
