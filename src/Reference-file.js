import React, { Component } from 'react';
import './App.css';
import {BrowserRouter,Switch,Route, Link} from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Form from './components/Form';


class App extends Component {
  state ={
    data : "This is the app Data"
  }
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <h1> App </h1>
          <Link to = '/home'><button>home</button></Link>

          <ul>
            <li><Link to = '/about'>About</Link></li>
            <li><Link to = '/form'>Form</Link></li>
          </ul>
          <hr/>
          <Switch>
            <Route  path = '/home' render = {
              () => <Home data = {this.state.data}/>
            }/>
            <Route path = '/about' render = {
              () => <About data = {this.state.data}/>
            }/>
            <Route path = '/form' render = {
              () => <Form data = {this.state.data}/>
            }/>
            <Route render = {
              () => <h1>Not Found</h1>
            }/>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
