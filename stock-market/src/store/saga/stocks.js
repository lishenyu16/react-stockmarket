import { put } from 'redux-saga/effects'
import * as actions from '../actions/index'
import axios from '../../axiosServer'

export function* placeOrderSaga(action){
    let header = {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
        }
    }
    yield put({
        type:'startTrading'
    })
    try{
        const res = yield axios().post('/stocks/update', action.order,header)
        alert('Order is placed!')
        yield put(actions.updateBuyingPower(res.data))
        yield put(actions.placeOrderSuccess())
    }
    catch(error){
        yield put(actions.placeOrderFail(error))
    }
}
