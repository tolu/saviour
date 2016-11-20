import React, {Component} from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

const tightPaperStyle = {
  padding: '10px 25px',
  margin: '3px'
};
const selectStyle = {
  marginLeft: 10,
  width: 150,
};
const btnStyle = {
  marginLeft: 10,
  marginTop: 10
};

export default class DataInput extends Component {
  constructor(props){
    super(props);
    this.state = {
      who: 0,
      what: 1,
      value: 0
    };
  }
  onAddTransaction = () => {
    console.log(this.state);
    this.props.addTransaction(this.state);
    this.setState({ who:0, what:1, value:0 });
  }

  whoChanged = (event, index, who) => this.setState({ who });
  whatChanged = (event, index, what) => this.setState({ what });
  amountChanged = (event) => this.setState({ value: parseFloat(event.target.value) });

  render(){
    return (
      <Paper style={tightPaperStyle} zDepth={1}>
        <TextField
          style={ selectStyle }
          type="number"
          value={ this.state.value }
          onChange={ this.amountChanged }
          floatingLabelText="Amount"
          hintText="25000" />
        <SelectField
          value={ this.state.who }
          onChange={this.whoChanged}
          floatingLabelText="Vem"
          style={selectStyle}>
          <MenuItem value={0} primaryText="Tobias" />
          <MenuItem value={1} primaryText="Marte" />
        </SelectField>
        <SelectField
          value={this.state.what}
          onChange={this.whatChanged}
          floatingLabelText="Vad"
          style={selectStyle}>
          <MenuItem value={0} primaryText="BSU" />
          <MenuItem value={1} primaryText="Konto" />
          <MenuItem value={2} primaryText="Gave" />
          <MenuItem value={3} primaryText="Depositum" />
        </SelectField>
        <FloatingActionButton style={btnStyle} onTouchTap={this.onAddTransaction} >
          <ContentAdd />
        </FloatingActionButton>
      </Paper>
    );
  }
}
