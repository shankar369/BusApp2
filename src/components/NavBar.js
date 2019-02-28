import React, { Component } from 'react'
import {Link , withRouter} from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton'
import * as firebase from 'firebase'

export class NavBar extends Component {


  logout=()=>{
    if(this.props.buttonName === 'Log Out'){
      firebase.auth().signOut();
     // this.props.changeState(2);
    }
  }
  render() {

    return (
      <div>

            <nav className="navbar navbar-light bg-primary navbar-fixed-bottom row">
            <div className="col-sm-6">
                <img className="navbar-brand" src={require("./logo.png")} alt = "logo" />
            </div>
            <div className = "col-sm-6 mt-2">
                <Link to = {this.props.toPath}> <RaisedButton onClick = {this.logout} secondary label = {this.props.buttonName} /></Link> 
            </div>
            </nav>
            
      </div>
    )
  }
}

export default withRouter(NavBar)
