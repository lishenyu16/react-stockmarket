import axios from 'axios';
// import * as apis from '../../iex'

// Promise.all([
//     axios.get('http://google.com'),
//     axios.get('http://apple.com')
//   ]).then(([google, apple]) => {
//     // do something with both responses
//   });

export const getStockDetailSuccess = (arr)=>{
    return {
        type:'getStockDetail',
        stockDetails: arr
    }
}
export const getStockDetail = (symbol,range)=>{

    return dispatch=>{
        axios.all(
            [
                axios.get(`/stock/${symbol}/quote`),
                axios.get(`/stock/${symbol}/logo`),
                axios.get(`/stock/${symbol}/news`),
                axios.get(`/stock/${symbol}/chart/${range}`)
            ]
        )
        .then(axios.spread((quoteRes,logoRes,newsRes,chartRes)=> {
            // All requests are now complete
            dispatch(getStockDetailSuccess([quoteRes.data,logoRes.data.url,newsRes.data,chartRes.data]))
        }))
        .catch(err=>{
            alert(err)
        })
    }
}

export const getMarketStocksSuccess = (data)=>{
    return {
        type: 'fetchMarketStocks',
        marketStocks: data
    }
}
export const getMarketStocks = ()=>{
    return dispatch =>{
        axios.get('/stock/market/batch?symbols=aapl,fb,tsla,goog,baba,twtr&types=quote&range=1d&last=5')
            .then(res=>{
                dispatch(getMarketStocksSuccess(res.data))
            })
            .catch(err=>console.log(err))
    }
}