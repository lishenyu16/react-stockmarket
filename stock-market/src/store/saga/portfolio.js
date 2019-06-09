import { put } from 'redux-saga/effects'
import * as actions from '../actions/index'
import axios from '../../axiosServer'
import { store } from '../../index'

export function* getUserStocksSaga(action){
    let id = action.id
    let header = {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
        }
    }
    if(id!==null){
        try{
            const res = yield axios().get('/stocks/' + id, header)
            yield put(actions.getUserStocksSuccess(res.data))
        }
        catch(error){
            console.log(error)
        }
    }
}

export function* getUserBuyingPowerSaga(action){
    let id = action.id
    let header = {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
        }
    }
    if(id!==null&&localStorage.getItem('token')!==null){
        try{
            const res = yield axios().get(`/getbuyingpower/${id}`,header)
            yield put(actions.getUserBuyingPowerSuccess(res.data))
        }
        catch(error){
            console.log(error)
        }
    }
}

export function* getTotalValueSaga(action){

    let userStocks = yield store.getState().portfolio.stocks
    let marketStocks = yield store.getState().market.marketStocks
    let totalValue = 0
    for(let i of userStocks){
        for(let n of marketStocks){
            if(i.symbol.toLowerCase()==Object.keys(n)[0].toLowerCase()){
                totalValue += i.shares * Object.values(n)[0].quote.latestPrice
                break
            }
        }
    }
    yield put(actions.getTotalValueSuccess(totalValue))
}

export function* getUserHomeStocksSaga(action){
    let userStocks = yield store.getState().portfolio.stocks
    let marketStocks = yield store.getState().market.marketStocks
    let u = []
    if(userStocks.length>0){
        for(let i of userStocks){
            u=u.concat(marketStocks.filter(item=>Object.keys(item)[0].toLocaleLowerCase() == i.symbol.toLocaleLowerCase()))
        }
    }
    yield put(actions.getUserHomeStocksSuccess(u))
}

export function* getUserOrdersSaga(action){
    let header = {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
        }
    }
    let id = localStorage.getItem('userId')
    try{
        const res = yield axios().get(`/orders/${id}`, header)
        yield put(actions.getUsersOrdersSuccess(res.data))
    }
    catch(error){
        console.log(error)
    }
}