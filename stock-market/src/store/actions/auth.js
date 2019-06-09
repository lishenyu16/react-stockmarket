
import axios from '../../axiosServer'

export const authSuccess = (authData)=>{
    return {
        type: 'auth_success',
        authData
    }
}

export const authFail = (error)=>{
    return {
        type: 'auth_fail',
        error
    }
}

export const logout = ()=>{
    return {
        type: 'logout_saga'
    }
}

//sign up
export const auth = (username,email,password)=>{
    return {
        type: 'auth_saga',
        username,
        email,
        password
    }
}
export const authSignIn = (email,password)=>{
    return {
        type: 'auth_signin_saga',
        email,
        password
    }
}

export const checkAuthState = ()=>{
    return {
        type: 'checkAuthState'
    }
}