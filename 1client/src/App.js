import React from 'react';
import styles from './styles.css';
import init from './init.js';
import Review from './Review.js';
import { connect } from 'react-redux';
import $ from 'jquery';
import store from './store.js';

class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      something: '',
    };
  }

  componentDidMount() {
  }

  render() {
    return (
      <div>
        <Review />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {

  };
};

const mapDispatchToProps = (dispatch) => {
  return {

  };

};


export default connect(mapStateToProps, mapDispatchToProps)(App);