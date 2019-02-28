import React, { Component } from 'react'
import NavBar from './NavBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import * as firebase from 'firebase'
import {withRouter} from 'react-router-dom';
import ReactDOM from 'react-dom';


export class SignUp extends Component {
    constructor(){
        super();
        this.auth = firebase.auth();        
    }

    state = {
        userName : '',
        password1 : '',
        password2 : ''
    }

    handleChange = input => e =>{
        this.setState({[input] : e.target.value})
    }

    showError(alert , Class){
        const Alert = (
            <div className={Class} role="alert">
                {alert}
            </div>
        )
        ReactDOM.render(Alert,document.getElementById("show-error"))
        setTimeout(()=> {
            var item = document.getElementById("show-error");
            //item.parentNode.removeChild(item);
        },3000)
    }


    signUpUser = () => {
 
        
        if(this.state.password1 !== this.state.password2){
            this.showError("Please check your password","alert alert-danger");
            
        }
        
        else{
            console.log(this.state.userName,this.state.password1);
            const promise = this.auth.createUserWithEmailAndPassword(this.state.userName,this.state.password1); 
            promise
            .then(user => {
                console.log(user);
                this.showError("Signed Up Successfully!","alert alert-success");
                this.props.history.push('/');
            })
            .catch(err =>{ 
                console.log(err)
                if(err.code === "auth/email-already-in-use"){
                        this.showError("Email already in use","alert alert-danger");
                  }
                if(err.code === "auth/invalid-email"){
                    this.showError("Invalid Email ID","alert alert-danger");
                }
                else{
                    this.showError("Something went wrong","alert alert-danger");
                }
            })
        }
    }

  render() {

    return (
        <MuiThemeProvider>
       <React.Fragment>
        <NavBar buttonName = "Login" toPath = "/"/>


                <form style = {styles.form}>
                    <h2>Sign Up</h2>
                    <br></br>
                    <div id="show-error"></div>
                    <center>
                       
                            <TextField
                                hintText = "Enter Your Email"
                                floatingLabelText = "Email"
                                onChange = {this.handleChange("userName")}
                            />
                                    <br/>
                            <TextField
                                hintText = "Enter Your Password"
                                floatingLabelText = "Password"
                                type = "password"
                                onChange = {this.handleChange("password1")}
                            />

                               
                                <br/>
                                <TextField
                                hintText = "Re-Enter Your Password"
                                floatingLabelText = "Re-Enter Password"
                                type = "password"
                                onChange = {this.handleChange("password2")}
                            />

                               
                                <br/>

                            <RaisedButton
                                style = {styles.button}
                                label = 'Sign Up'
                                primary
                                onClick = {this.signUpUser}
                            /> 
                    </center> 
                </form>
         
        </React.Fragment>
      </MuiThemeProvider>
    )
  }
}


const styles = {
    button :{
        margin : 15
    },
    form :{
        margin : 5
    }
}


export default withRouter(SignUp)
