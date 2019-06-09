import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import Input from '../../components/UI/Input/Input'
import isEmail from 'validator/lib/isEmail';
import styles from './Auth.module.css'
import {FormErrors} from './FormErrors'
import {connect} from 'react-redux'
import * as actions from '../../store/actions/index'

class Auth extends Component {

    state={
        username:'',
        email: '',
        password: '',
        confirmation: '',
        formErrors: {username: '', email: '', password: '', confirmation: ''},
        usernameValid:false,
        emailValid: false,
        passwordValid: false,
        confirmationValid: false,
        signUpFormValid: false,
        signInFormValid: false,
        isSignup: true,
        isSignin: false,
    }

    handleInputChange = (event,target) => { 
        this.setState(
            {
                [event.target.name]: event.target.value,
            })
        this.validateField(target, event.target.value)
    }
    validateField = (fieldName, value) => {
        let fieldValidationErrors = this.state.formErrors;
        let usernameValid = this.state.usernameValid;
        let emailValid = this.state.emailValid;
        let passwordValid = this.state.passwordValid;
        let confirmationValid = this.state.confirmationValid;
      
        switch(fieldName) {
          case 'username':
            usernameValid = value.length >= 3 && value.length <= 12;
            fieldValidationErrors.name = usernameValid ? '' : ' length range should be between 3~12';
            break;
          case 'email':
            emailValid = isEmail(value.trim()) // value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
            fieldValidationErrors.email = emailValid ? '' : ' is invalid';
            break;
          case 'password':
            passwordValid = value.length >= 6 && value.length <= 12;
            fieldValidationErrors.password = passwordValid ? '': ' length range should be between 6~12';
            break;
          case 'confirmation':
            confirmationValid = value===this.state.password;
            fieldValidationErrors.confirmation = confirmationValid ? '': ' not match password!';
            break;
          default:
            break;
        }
        let signUpFormValid = usernameValid && emailValid && passwordValid && confirmationValid
        let signInFormValid = emailValid && passwordValid
        this.setState(
            {
                formErrors: fieldValidationErrors,
                usernameValid: usernameValid,
                emailValid: emailValid,
                passwordValid: passwordValid,
                confirmationValid: confirmationValid,
                signUpFormValid: signUpFormValid,
                signInFormValid: signInFormValid
            }
        );
    }
      
    // validateForm=()=> {
    //     this.setState({signUpFormValid: this.state.nameValid && this.state.emailValid && this.state.passwordValid && this.state.confirmationValid});
    // }
    handleFormSubmit=(event)=>{
        event.preventDefault()
        if(this.state.isSignin){
            this.props.onSignIn(this.state.email,this.state.password)
        }
        if(this.state.isSignup){
            this.props.onSignUp(this.state.username, this.state.email,this.state.password)
        }
        
    }
    switchSignup=()=>{
        this.setState({
            isSignin:false,
            isSignup:true
        })
    }
    switchSignin=()=>{
        this.setState({
            isSignin:true,
            isSignup:false
        })
    }

    render(){   
        
        let form = <form onSubmit={this.handleFormSubmit}>
                    <Input inputtype='input' type="text" name='username' label="Username" required={true} changed={(event)=>{this.handleInputChange(event,'username')}} value={this.state.username}></Input>
                    <Input inputtype='input' type="email" name='email' label="Email" required={true} changed={(event)=>{this.handleInputChange(event,'email')}}  value={this.state.email}></Input>
                    <Input inputtype='input' type="password" name='password' label="Password" required={true} changed={(event)=>{this.handleInputChange(event,'password')}}  value={this.state.password}></Input>
                    <Input inputtype='input' type="password" name='confirmation' label="Password Confirmation" required={true} changed={(event)=>{this.handleInputChange(event,'confirmation')}}  value={this.state.confirmation}></Input>
                    <button 
                        className={styles.SignUp} 
                        disabled={!this.state.signUpFormValid}>
                        Sign Up
                    </button>
                </form>
        if(this.state.isSignin){  //sign in mode
            form = <form onSubmit={this.handleFormSubmit}>
                    <Input inputtype='input' type="email" name='email' label="Email" required={true} changed={(event)=>{this.handleInputChange(event,'email')}}  value={this.state.email}></Input>
                    <Input inputtype='input' type="password" name='password' label="Password" required={true} changed={(event)=>{this.handleInputChange(event,'password')}}  value={this.state.password}></Input>
                    <button 
                        className={styles.SignUp} 
                        disabled={!this.state.signInFormValid}>
                        Sign In
                    </button>
                </form>
        }
        // if(this.props.loading){
        //     form=<Spinner />
        // }
        let errorMessage = null
        if(this.props.error){
            errorMessage = (<p>{this.props.error.response.data.error}</p>)
        }

        let signupClasses = []
        if(this.state.isSignup){
            signupClasses = [styles.SwitchButton, styles.SwitchSignup,styles.SwitchActive]
        }
        else{
            signupClasses = [styles.SwitchButton, styles.SwitchSignup]
        }

        let signinClasses = []
        if(this.state.isSignin){
            signinClasses = [styles.SwitchButton, styles.SwitchSignin,styles.SwitchActive]
        }
        else{
            signinClasses = [styles.SwitchButton, styles.SwitchSignin]
        }

        let redirect = null
        if(this.props.isLoggedIn){
            if(this.props.buildingBurger){
                redirect=<Redirect to="/checkout" />
            }else{
                redirect=<Redirect to="/" />
            }
            
        }

        return (             
            <React.Fragment>  
                <div className={styles.Switch}>
                    {redirect}
                    <button 
                        onClick={this.switchSignup}
                        className={signupClasses.join(' ')}>
                        Sign Up
                    </button >
                    <button 
                        onClick={this.switchSignin}
                        className={signinClasses.join(' ')}>
                        Sign In
                    </button>
                </div>    
                <div className={styles.ContactData}>                
                    <FormErrors formErrors={this.state.formErrors} />
                    {form}
                    {errorMessage}
                </div>
            </React.Fragment>    
        )
    }
}
const mapStateToProps = (state)=>{
    return {
        // loading: state.auth.loading,
        token: state.auth.token,
        userId: state.auth.userId,
        error: state.auth.error,
        isLoggedIn: state.auth.isLoggedIn,
    }
}
const mapDispatchToProps = (dispatch)=>{
    return {
        onSignIn :(email,password)=> dispatch(actions.authSignIn(email,password)),
        onSignUp :(username,email,password)=> dispatch(actions.auth(username,email,password)),
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Auth)