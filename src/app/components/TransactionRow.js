import React, {Component} from 'react';
import {TableRow, TableRowColumn} from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';
import Avatar from 'material-ui/Avatar';

class TransactionRow extends Component {
  constructor(props){
    super(props);
    this.onButtonClick = props.removeTransaction || this.onButtonClick;
  }

  onButtonClick = (idx, amount) => console.debug('klicked', idx, amount);

  render(){
    const t = this.props.transaction;
    const handler = this.onButtonClick.bind(this, t.key, t.amount);
    return (
      <TableRow key={t.key}>
        <TableRowColumn><Avatar src={t.user} /></TableRowColumn>
        <TableRowColumn>{t.lable}</TableRowColumn>
        <TableRowColumn>{t.amount}</TableRowColumn>
        <TableRowColumn><RaisedButton label="Remove" secondary={true} onTouchTap={handler} /></TableRowColumn>
      </TableRow>
    );
  }
}

export default TransactionRow;
