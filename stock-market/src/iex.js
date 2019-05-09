import axios from 'axios'

//https://cloud.iexapis.com/stable/stock/goog/quote?token=

//list of quots: 
///stock/market/batch?symbols=aapl,fb,tsla&types=quote,news,chart&range=1m&last=5

//chart data:
//https://api.iextrading.com/1.0/stock/aapl/chart/1d  (1d,1m,3m,6m,ytd,1y,2y,5y)
const api = axios.create({
  baseURL: 'https://api.iextrading.com/1.0'
})

export const loadQuotesForStock = (symbol) => {
  return api.get(`/stock/${symbol}/quote`)
    .then( res => res.data )
}

export const loadLogoForStock = (symbol) => {
  return api.get(`/stock/${symbol}/logo`)
    .then( res => res.data.url )
}

export const loadRecentNewsForStock = (symbol) => {
  return api.get(`/stock/${symbol}/news`)
    .then( res => res.data)
}

export const loadChartForStock = (symbol, range) => {
  return api.get(`/stock/${symbol}/chart/${range}`)
    .then( res => res.data)
}