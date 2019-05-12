
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
    localStorage.removeItem('username')
    localStorage.removeItem('email')
    localStorage.removeItem('token')
    localStorage.removeItem('isAdmin')
    localStorage.removeItem('expirationDate')
    return {
        type: 'logout'
    }
}

//sign up
export const auth = (username,email,password)=>{
    const authData = {
        username,
        email,
        password
    }
    return dispatch=>{
        axios().post('/register',authData)
            .then(res=>{
                localStorage.setItem('username',res.data.username)
                localStorage.setItem('email',res.data.email)
                localStorage.setItem('token',res.data.token)
                localStorage.setItem('isAdmin',res.data.isAdmin)
                localStorage.setItem('expirationDate',new Date(res.data.expirationDate))
                dispatch(authSuccess(res.data))
            })
            .catch(err=>{
                dispatch(authFail(err))
            })
    }
}
export const authSignIn = (email,password)=>{
    const authData = {
        email,
        password
    }
    return (dispatch)=>{
        axios().post('/login',authData)
            .then(res=>{
                console.log(res.data)
                localStorage.setItem('username',res.data.username)
                localStorage.setItem('email',res.data.email)
                localStorage.setItem('token',res.data.token)
                localStorage.setItem('isAdmin',res.data.isAdmin)
                localStorage.setItem('expirationDate',new Date(res.data.expirationDate))
                //localStorage.setItem('expirationDate',new Date(new Date().getTime() + res.data.expiresIn*1000))
                dispatch(authSuccess(res.data))
            })
            .catch(err=>{
                dispatch(authFail(err))
            })
    }
}

export const checkAuthState = ()=>{
    return {
        type: 'checkAuthState'
    }
}