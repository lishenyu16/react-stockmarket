import { put } from 'redux-saga/effects'
import * as actions from '../actions/index'
import axios from 'axios'

export function* getMarketStocksSaga(action){
    try{
        const res = yield axios.get('https://api.iextrading.com/1.0/stock/market/batch?symbols=aapl,fb,tsla,goog,baba,twtr,msft,ba,intc,snap,nflx,techy&types=quote&range=1d&last=5')
        yield put(actions.getMarketStocksSuccess(res.data))
    }
    catch(error){
        console.log(error)
    }
}

export function* getStockDetailSaga(action){
    const symbol = action.symbol
    const range = action.range
    const chartInterval = action.chartInterval
    try{
        const quoteRes = yield axios.get(`/stock/${symbol}/quote`)
        const newsRes = yield axios.get(`https://cloud.iexapis.com/stable/stock/${symbol}/news?token=pk_7b1de8e9459d4c9999bac688f583a71c`)
        const chartRes = yield axios.get(`/stock/${symbol}/chart/${range}?chartInterval=${chartInterval}`)
        yield put(actions.getStockDetailSuccess([quoteRes.data,newsRes.data,chartRes.data]))
    }
    catch(error){
        alert(error)
    }
    // return dispatch=>{
    //     //https://storage.googleapis.com/iex/api/logos/${symbol.toUpperCase()}.png
    //     axios.all(
    //         [
    //             axios.get(`/stock/${symbol}/quote`),
    //             axios.get(`https://cloud.iexapis.com/stable/stock/${symbol}/news?token=pk_7b1de8e9459d4c9999bac688f583a71c`), 
    //             axios.get(`/stock/${symbol}/chart/${range}?chartInterval=${chartInterval}`)
    //         ]
    //     )
    //     .then(axios.spread((quoteRes,newsRes,chartRes)=> {
    //         // All requests are now complete
    //         dispatch(getStockDetailSuccess([quoteRes.data,newsRes.data,chartRes.data]))
    //     }))
    //     .catch(err=>{
    //         alert(err)
    //     })
    // }
}