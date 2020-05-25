import React from 'react';
import styles from './styles.css';

class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    let context = this;
    let value = event.target.value;
    context.setState({ value: event.target.value }, () => {
      context.props.getpreResults(value);
    });
  }
  handleSubmit(event) {
    event.preventDefault();
    this.props.setTrackList(this.state.value);
    this.props.setPause();
  }
  render() {
    return (
      <div>
        <div className={styles.inputBox}>
          <form onSubmit={this.handleSubmit}>
            <label>
              <input
                className={styles.searchInputBox}
                type="text"
                value={this.state.value}
                onChange={this.handleChange}
                placeholder="Search"
              />
            </label>
          </form>
        </div>
      </div>
    );
  }
}

module.exports = Input;
