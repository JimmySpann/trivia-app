import React from 'react';
import { connect } from 'react-redux';
// import { createStructuredSelector } from 'reselect';

import './App.css';

import QuestionContainer from './components/QuestionCard/questionCard'

function App() {
  return (
    <div>
      <QuestionContainer />
    </div>
  );
}

export default connect()(App);
