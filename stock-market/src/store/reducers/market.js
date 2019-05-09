const initialState={
    marketStocks:[],
    quote:{
        // "symbol": "",
        // "companyName": "",
        // "calculationPrice": "close",
        // "open": 246.94,
        // "openTime": 1557322200709,
        // "close": 244.84,
        // "closeTime": 1557345601092,
        // "high": 250.599,
        // "low": 244.2,
        // "latestPrice": 244.84,
        // "latestSource": "Close",
        // "latestTime": "May 8, 2019",
        // "latestUpdate": 1557345601092,
        // "latestVolume": 5887963,
        // "iexRealtimePrice": 244.77,
        // "iexLastUpdated": 1557345599580,
        // "delayedPrice": 244.84,
        // "delayedPriceTime": 1557345601092,
        // "extendedPrice": 244.8,
        // "extendedChange": -0.04,
        // "extendedChangePercent": -0.00016,
        // "extendedPriceTime": 1557349193385,
        // "previousClose": 247.06,
        // "change": -2.22,
        // "changePercent": -0.00899,
        // "marketCap": 42538557424,
        // "peRatio": -41.64,
        // "week52High": 387.46,
        // "week52Low": 231.13
    },
    logo:'',
    stockNews:[],
    chart: [],
    topNews:[]
}

const reducer = (state=initialState,action)=>{
    switch(action.type){
        case('fetchMarketStocks'):
            let obj = action.marketStocks
            let arr =[]
            for(let key in obj){
                arr.push({[key]:obj[key]})
            }
            return {...state, marketStocks: arr}
        case('getStockDetail'):
            let details = action.stockDetails
            //quote logo news chart
            return {
                ...state, 
                quote: details[0],
                logo: details[1],
                news: details[2],
                chart: details[3]
            }
        default:
            return state
    }
}

export default reducer