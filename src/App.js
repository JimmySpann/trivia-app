import React, {useState} from 'react';
import { connect } from 'react-redux';
// import { createStructuredSelector } from 'reselect';

import './App.css';

import QuestionContainer from './components/QuestionCard/questionCard'
import CountDownComponent from './components/QuestionCard/count-down/count-down'

function App() {

  return (
    <div>
      <QuestionContainer />
    </div>
  );
}

export default connect()(App);
