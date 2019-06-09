
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
export const getStockDetail = (symbol,range,chartInterval)=>{
    return {
        type:'getStockDetail_saga',
        symbol,
        range,
        chartInterval
    }
}

export const getMarketStocksSuccess = (data)=>{
    return {
        type: 'fetchMarketStocks',
        marketStocks: data
    }
}
export const getMarketStocks = ()=>{
    return {
        type: 'getMarketStocks_saga'
    }
}