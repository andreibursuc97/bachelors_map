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
class App extends Component {

    componentWillMount() {
        axios.defaults.baseURL = 'http://localhost:8089/api';
        //axios.defaults.timeout = 30000;
    }

  render() {
    return (
        <Router>
          <Switch>
            <Route path='/' exact={true} component={MapApp}/>
            <Route path='/line' exact={true} component={Library}/>
                  <Route path='/details' exact={true} component={Details}/>
              <Route path='/averages' exact={true} component={Averages}/>
            {/*<Route path='/facility/:id' exact={true} component={BookEdit}/>*/}
          </Switch>
        </Router>
    )
  }
}

export default App;
