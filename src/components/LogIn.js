import React, { Component } from 'react'
import NavBar from './NavBar'
import * as firebase from 'firebase'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import ReactDOM from 'react-dom';
import {Redirect} from 'react-router-dom';


export class LogIn extends Component {
    constructor(){
        super();
        this.auth = firebase.auth();        
    }

    state = {
        userName : '',
        password : ''
    }



    handleChange = input => e =>{
        this.setState({[input] : e.target.value})
    }

    signInUser = () => {
        console.log(this.state);
        const promise = this.auth.signInWithEmailAndPassword(this.state.userName,this.state.password);
        promise
        .then( user => {
            console.log(user);      
        }
        )
        .catch(err =>{ 
            console.log("Error in Login : ",err);
            const alert = (
                <div className="alert alert-danger" role="alert">
                Invalid User Details
              </div>
            )
            ReactDOM.render(alert,document.getElementById("show-error"))
            setTimeout(()=> {
                var item = document.getElementById("show-error");
                item.parentNode.removeChild(item);
            },1000)
        }) 
    }




  render() {
      if(this.props.logged === 2){
                return (
                <MuiThemeProvider>
                <React.Fragment>
                    <NavBar buttonName = "Sign Up" toPath = "/signup"/>


                            <form style = {styles.form}>
                                <h2>Login</h2>
                                <br></br>
                                <div id="show-error"></div>
                                <center>
                                    <i className = "fas fa-user-circle mr-3 fa-lg" />
                                        <TextField
                                            hintText = "Enter Your Email"
                                            floatingLabelText = "Email"
                                            onChange = {this.handleChange("userName")}

                                        />
                                                <br/>
                                    <i className = "fas fa-key fa-lg mr-3"></i>
                                        <TextField
                                            type = "password"
                                            hintText = "Enter Your Password"
                                            floatingLabelText = "Password"
                                            onChange = {this.handleChange("password")}
                                        />

                                            <br/>

                                        <RaisedButton
                                            style = {styles.button}
                                            label = 'Login'
                                            primary
                                            onClick = {this.signInUser} 
                                        /> 
                                </center> 
                            </form>
                    
                    </React.Fragment>
                </MuiThemeProvider>
                )
        }
        else if(this.props.logged === 1) {
             return <Redirect to = '/routes'/>
        }
    }

}



const styles = {
     button :{
         margin : 15
     },
     form :{
         margin : 10
     }
}

export default LogIn
