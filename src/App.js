import React from 'react';
import logo from './logo.svg';
import Map from './Map'
import {Component} from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import axios from 'axios'

class App extends Component {

    componentWillMount() {
        axios.defaults.baseURL = 'http://localhost:8080/api';
        //axios.defaults.timeout = 30000;
    }

  render() {
    return (
        <Router>
          <Switch>
            <Route path='/' exact={true} component={Map}/>
            {/*<Route path='/facility/:id' exact={true} component={BookEdit}/>*/}
          </Switch>
        </Router>
    )
  }
}

export default App;
