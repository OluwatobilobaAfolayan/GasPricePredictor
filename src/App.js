import React, { Component } from 'react';
import ClientInfo from './clientInfo';
import Menu from './menu';
import QuoteHistory from './quoteHistory';
import RequestQuote from './requestQuote';
import './App.css';
import Footer from './footer.js'
import {Provider} from 'react-redux';
import configureStore from './redux/store';
import { BrowserRouter, Route } from "react-router-dom";


const store = configureStore();

class App extends Component {
  render() {
    return (
      <Provider store = {store}>
          <div className="App">
              <BrowserRouter>
                  <div>
                      <header className="App-header">
                          Gas Cooperation
                          <Menu/>
                      </header>
                      <Route path="/" exact component={ClientInfo}/>
                      <Route path="/clientInfo" exact component={ClientInfo}/>
                      <Route path="/requestQuote" component={RequestQuote}/>
                      <Route path="/quoteHistory" component={QuoteHistory}/>
                      {/* <Footer/> */}
                  </div>
              </BrowserRouter>
          </div>
      </Provider>
    );
  }
}

export default App;
