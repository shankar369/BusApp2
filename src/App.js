import React, { Component } from 'react';
import './App.css';
import {HashRouter,Switch,Route,Redirect } from 'react-router-dom';
import LogIn from './components/LogIn';
import SignUp from './components/SignUp';
import Routes from './components/Routes';
import * as firebase from 'firebase';

class App extends Component {

  constructor(){
    super();
    var config = {
      apiKey: process.env.REACT_APP_apiKey,
      authDomain: process.env.REACT_APP_authDomain,
      databaseURL: process.env.REACT_APP_databaseURL,
      projectId: process.env.REACT_APP_projectId,
      storageBucket: process.env.REACT_APP_storageBucket,
      messagingSenderId: process.env.REACT_APP_messagingSenderId
    };
    firebase.initializeApp(config);
    this.auth = firebase.auth(); 

    this.auth.onAuthStateChanged(user => {
      if (user) {
        // User is signed in.
        this.setState({page : 1})
        console.log("user is signed in ")
      } else { 
        this.setState({page : 2})
        console.log("user not signed in")
      }
    });

  }



  state = {
    data : "This is the app Data",
    page : 2
  }
  



  render() {

    return (
      <HashRouter basename='/'>
        <div className="App">
          <Switch>
            <Route exact path = '/' render = {
              () => <LogIn logged = {this.state.page} data = {this.state.data}/>
            }/>
            <Route path = '/signup' render = {
              () => <SignUp setPage = {this.setPage} data = {this.state.data}/>
            }/>
            <Route path = '/routes' render = {
              () => <Routes logged = {this.state.page} data = {this.state.data}/>
            }/>
            <Route render = {
              () => <h1>Page Not Found</h1>
            }/>
          </Switch>
          {/* <Redirect to = '/'/> */}
        </div>
      </HashRouter>
    );
  }

}
// ReactDOM.render(<App/>,document.getElementById('root'));

export default App;

