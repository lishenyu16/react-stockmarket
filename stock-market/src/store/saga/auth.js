import { put } from 'redux-saga/effects'
import * as actions from '../actions/index'
import axios from '../../axiosServer'

export function* logoutSaga(action){
    yield localStorage.removeItem('username')
    yield localStorage.removeItem('userId')
    yield localStorage.removeItem('email')
    yield localStorage.removeItem('token')
    yield localStorage.removeItem('isAdmin')
    yield localStorage.removeItem('expirationDate')
    yield console.log('in the auth saga now!')
    yield put({
        type: 'logout'
    })
}

//sign up
export function* authSaga(action) {
    const authData = {
        username: action.username,
        email: action.email,
        password: action.password
    }
    try{
        const res = yield axios().post('/register',authData)
        yield localStorage.setItem('userId',res.data.userId)
        yield localStorage.setItem('username',res.data.username)
        yield localStorage.setItem('email',res.data.email)
        yield localStorage.setItem('token',res.data.token)
        yield localStorage.setItem('isAdmin',res.data.isAdmin)
        yield localStorage.setItem('expirationDate',new Date(res.data.expirationDate))
        yield put(actions.authSuccess(res.data))
    } 
    catch ( error ) {
        console.log(error)
        yield put(actions.authFail(error))
    }
}

export function* authSigninSaga(action){
    const authData = {
        email:action.email,
        password: action.password
    }
    try{
        const res = yield axios().post('/login',authData)
        yield localStorage.setItem('userId',res.data.userId)
        yield localStorage.setItem('username',res.data.username)
        yield localStorage.setItem('email',res.data.email)
        yield localStorage.setItem('token',res.data.token)
        yield localStorage.setItem('isAdmin',res.data.isAdmin)
        yield localStorage.setItem('expirationDate',new Date(res.data.expirationDate))
        yield put(actions.authSuccess(res.data))
    }
    catch(error){
        yield put(actions.authFail(error))
    }
}