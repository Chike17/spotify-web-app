import React from 'react';
import styles from './styles.css';

class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    let context = this;
    let value = event.target.value;
    context.setState({value: event.target.value}, () => {
      console.log(value); 
    });
  }
  handleSubmit(event) {
    event.preventDefault();
    this.props.setTrackList(this.state.value);
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
      </form>
    );
  }
}


module.exports = Input;