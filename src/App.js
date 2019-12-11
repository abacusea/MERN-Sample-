import React, { Component } from 'react';
import Header from './components/Header';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Item from './components/Item';

import { Provider } from 'react-redux';
import store from './store';



class App extends Component {
  render() {
    return (
      <Provider store = {store}>
        <BrowserRouter>
          <div className="App">
            <Header />
            <br />
            <Switch>
              <Route exact path='/' component={Home} />
              <Route path='/:item_id' component={Item} />
            </Switch>  
          </div>
        </BrowserRouter>
      </Provider>
    )  
  }
}

export default App;
