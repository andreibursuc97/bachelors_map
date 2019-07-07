import React from 'react';
import logo from './logo.svg';
import MapApp from './MapApp'
import {Component} from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import axios from 'axios'
import Library from "./Library";
import Details from "./Details"
import Averages from "./Averages";
import TestMap from "./TestMap"
class App extends Component {

    componentWillMount() {
        axios.defaults.baseURL = 'http://localhost:8089/api';
        //axios.defaults.timeout = 30000;
    }

  render() {
    return (
        <Router>
          <Switch>
            <Route path='/map' exact={true} component={MapApp}/>
            <Route path='/test' exact={true} component={TestMap}/>
            <Route path='/' exact={true} component={Library}/>
            <Route path='/details/:id' exact={true} component={Details}/>
            <Route path='/averages' exact={true} component={Averages}/>
          </Switch>
        </Router>
    )
  }
}

export default App;
